import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../shared/firebase";
import PageTitle from "../../shared/components/PageTitle";
import SelectBox from "../../shared/components/SelectBox";
import CalcBox from "../mySalary/components/CalcBox";
import EditableCalcBox from "../mySalary/components/EditableCalcBox";
import styled from "styled-components";

const ContentBox = styled.div`
  margin-top: 30px;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyInfo = styled.div`
  color: var(--text-disabled);
  font-size: var(--font-size-primary);
  font-weight: 400;
  line-height: 24px;
  display: block;
  span {
    margin-right: 28px;
    display: inline-block;
  }
`;

const SalaryCalcBox = styled.div`
  margin-top: 26px;
  display: flex;
  flex: 1;
  padding: 24px 30px;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  border: 1px solid var(--background-color);
  background-color: var(--accent);
  color: var(--white);
  font-size: var(--font-size-title-medium);
  font-weight: 700;
  letter-spacing: -0.48px;
`;

const Left = styled.span``;

const Right = styled.span`
  text-align: right;
`;

const CalcWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const SalaryAdmin = () => {
  const { employeeId } = useParams();
  const [salaryData, setSalaryData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    if (!employeeId) return;

    const fetchAvailableMonths = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("employeeId", "==", Number(employeeId))
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return;

        const userDoc = querySnapshot.docs[0];
        const userUid = userDoc.id;

        const monthsRef = collection(db, "salaries", userUid, "months");
        const monthsSnap = await getDocs(monthsRef);

        if (monthsSnap.empty) {
          setAvailableMonths([]);
          setSelectedMonth("");
          return;
        }

        const sortedMonths = monthsSnap.docs
          .map((doc) => doc.id)
          .sort((a, b) => {
            return (
              new Date(b.replace(/년 |월/g, "")) -
              new Date(a.replace(/년 |월/g, ""))
            );
          })
          .slice(0, 12);

        setAvailableMonths(sortedMonths);
        setSelectedMonth(sortedMonths[0] || "");
      } catch (error) {
        console.error("❌ 월 데이터 조회 오류:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("employeeId", "==", Number(employeeId))
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          //setUserInfo(querySnapshot.docs[0].data());
          const userDoc = querySnapshot.docs[0];
          setUserInfo({ ...userDoc.data(), uid: userDoc.id }); // 🔥 uid 추가
        }
      } catch (error) {
        console.error("❌ 유저 데이터 조회 오류:", error);
      }
    };

    fetchAvailableMonths();
    fetchUserData();
  }, [employeeId]);

  useEffect(() => {
    if (!selectedMonth || !userInfo?.uid) return; // 🔥 userInfo?.uid 체크 추가

    const fetchSalaryData = async () => {
      console.log("📌 Fetching salary data for:", userInfo?.uid, selectedMonth);

      const salaryRef = doc(
        db,
        "salaries",
        userInfo.uid,
        "months",
        selectedMonth
      );
      const salarySnap = await getDoc(salaryRef);

      if (salarySnap.exists()) {
        console.log("📌 Fetched salary data:", salarySnap.data());
        setSalaryData(salarySnap.data());
      } else {
        console.log("⚠️ No salary data found, setting defaults");
        setSalaryData({ netSalary: 0, payments: [], deductions: [] });
      }
    };

    fetchSalaryData();
  }, [selectedMonth, userInfo]);

  const handleSavePayments = async (updatedPayments) => {
    if (!salaryData) return;

    // 총 지급액 계산
    const totalPayments = Object.values(updatedPayments).reduce(
      (acc, val) => acc + val,
      0
    );

    // 공제 내역 재계산
    const recalculateDeductions = (payments) => {
      const baseSalary = payments?.baseSalary || 0;
      const overtimePay = payments?.overtimePay || 0;

      return {
        pension: Math.floor((baseSalary + overtimePay) * 0.045),
        healthInsurance: Math.floor((baseSalary + overtimePay) * 0.0345),
        employmentInsurance: Math.floor((baseSalary + overtimePay) * 0.008),
        incomeTax: Math.floor((baseSalary + overtimePay) * 0.07),
        localIncomeTax: Math.floor((baseSalary + overtimePay) * 0.01),
      };
    };

    const updatedDeductions = recalculateDeductions(updatedPayments);
    const totalDeductions = Object.values(updatedDeductions).reduce(
      (acc, val) => acc + val,
      0
    );

    const updatedNetSalary = totalPayments - totalDeductions;

    try {
      const salaryRef = doc(
        db,
        "salaries",
        userInfo.uid,
        "months",
        selectedMonth
      );
      await updateDoc(salaryRef, {
        payments: updatedPayments,
        deductions: updatedDeductions,
        netSalary: updatedNetSalary,
      });

      // 🔥 새로운 객체로 변경하여 강제 리렌더링
      setSalaryData((prev) => ({
        ...prev,
        payments: { ...updatedPayments }, // ✅ 새로운 객체 할당
        deductions: { ...updatedDeductions }, // ✅ 새로운 객체 할당
        netSalary: updatedNetSalary,
      }));
    } catch (error) {
      console.error("❌ 급여 데이터 업데이트 오류:", error);
    }
  };

  // 입사일 포맷팅
  const formattedHiredDate = userInfo?.hiredDate
    ? userInfo.hiredDate instanceof Timestamp
      ? new Date(userInfo.hiredDate.seconds * 1000).toISOString().split("T")[0]
      : new Date(userInfo.hiredDate).toISOString().split("T")[0]
    : "입사일 없음";

  return (
    <>
      <PageTitle title="급여 관리" />
      <ContentBox>
        <InfoWrap>
          <MyInfo>
            <span>사번 : {employeeId}</span>
            <span>이름 : {userInfo?.name || "정보 없음"}</span>
            <span>
              {userInfo?.location || "위치 없음"} /{" "}
              {userInfo?.position || "직책 없음"}
            </span>
            <span>입사일 : {formattedHiredDate}</span>
          </MyInfo>
          <SelectBox
            options={availableMonths.length > 0 ? availableMonths : ["없음"]}
            defaultOption={availableMonths.length > 0 ? selectedMonth : "없음"}
            size="small"
            onSelect={(selectedValue) => {
              if (selectedValue !== "없음") {
                setSelectedMonth(selectedValue); // 유효한 값만 업데이트
              }
            }}
          />
        </InfoWrap>
        {salaryData && (
          <SalaryCalcBox>
            <Left>실 지급액</Left>
            <Right>{salaryData.netSalary.toLocaleString()} 원</Right>
          </SalaryCalcBox>
        )}
        {salaryData && (
          <CalcWrapper>
            <EditableCalcBox
              data={salaryData?.payments || []}
              onSave={handleSavePayments}
            />
            <CalcBox
              key={JSON.stringify(salaryData.deductions)}
              type="deductions"
              data={salaryData?.deductions || []}
            />
          </CalcWrapper>
        )}
      </ContentBox>
    </>
  );
};

export default SalaryAdmin;
