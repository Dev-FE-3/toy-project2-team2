import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../shared/firebase";
import PageTitle from "../../shared/components/PageTitle";
import SelectBox from "../../shared/components/SelectBox";
import CalcBox from "../mySalary/components/CalcBox";
import EditableCalcBox from "../mySalary/components/EditableCalcBox";
import styled from "styled-components";
import useAvailableMonths from "./hooks/useAvailableMonths";
import useSalaryData from "./hooks/useSalaryData";
import useRecalculateDeductions from "./hooks/useRecalculateDeductions";
import formatHiredDate from "./utils/formatHiredDate";

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
  const [userInfo, setUserInfo] = useState(null);
  const { recalculateDeductions } = useRecalculateDeductions();
  const formattedHiredDate = formatHiredDate(userInfo?.hiredDate);

  useEffect(() => {
    if (!employeeId) return;
    // 사번으로 유저 데이터 조회
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("employeeId", "==", Number(employeeId))
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserInfo({ ...userDoc.data(), uid: userDoc.id }); // uid 추가
        }
      } catch (error) {
        console.error("유저 데이터 조회 오류:", error);
      }
    };

    fetchUserData();
  }, [employeeId]);

  const {
    months: availableMonths,
    selectedMonth,
    setSelectedMonth,
  } = useAvailableMonths(userInfo?.uid);

  const { salaryData, updateSalaryData } = useSalaryData(
    userInfo?.uid,
    selectedMonth
  );

  const handleSavePayments = async (updatedPayments) => {
    if (!salaryData) return;

    const totalPayments = Object.values(updatedPayments).reduce(
      (acc, val) => acc + val,
      0
    );
    const updatedDeductions = recalculateDeductions(updatedPayments); // 훅 사용
    const totalDeductions = Object.values(updatedDeductions).reduce(
      (acc, val) => acc + val,
      0
    );
    const updatedNetSalary = totalPayments - totalDeductions;

    await updateSalaryData({
      payments: updatedPayments,
      deductions: updatedDeductions,
      netSalary: updatedNetSalary,
    });
  };

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
        {salaryData ? (
          <SalaryCalcBox>
            <Left>실 지급액</Left>
            <Right>{salaryData.netSalary.toLocaleString()} 원</Right>
          </SalaryCalcBox>
        ) : (
          <SalaryCalcBox>
            <Left>실 지급액</Left>
            <Right>0 원</Right>
          </SalaryCalcBox>
        )}
        <CalcWrapper>
          <EditableCalcBox
            data={salaryData?.payments || []}
            onSave={handleSavePayments}
          />
          <CalcBox type="deductions" data={salaryData?.deductions || []} />
        </CalcWrapper>
      </ContentBox>
    </>
  );
};

export default SalaryAdmin;
