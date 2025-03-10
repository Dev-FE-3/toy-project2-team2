import styled from "styled-components";
import PageTitle from "../../shared/components/PageTitle";
import CalcBox from "./components/CalcBox";
import { auth, db } from "../../shared/firebase";
import {
  doc,
  getDoc,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import SelectBox from "../../shared/components/SelectBox";

// 스타일 컴포넌트 정의
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

const CalcWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Left = styled.span``;

const Right = styled.span`
  text-align: right;
`;

const MySalary = () => {
  const [salaryData, setSalaryData] = useState(null); // 급여 데이터
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보
  const [selectedMonth, setSelectedMonth] = useState("2025년 2월"); // 선택된 월
  const [availableMonths, setAvailableMonths] = useState([]); // 선택 가능한 월들

  const user = auth.currentUser; // 현재 로그인된 사용자 정보

  // 사용자 및 급여 데이터 가져오기
  useEffect(() => {
    if (!user) {
      console.log("사용자 정보 없음");
      return;
    }

    // 사용자가 선택할 수 있는 월 목록 가져오기
    const fetchAvailableMonths = async () => {
      const monthsRef = collection(db, "salaries", user.uid, "months");
      const monthsSnap = await getDocs(monthsRef);
      const months = monthsSnap.docs.map((doc) => doc.id);

      // 날짜순 정렬 후 최신 12개월만 남기기
      const sortedMonths = months
        .sort((a, b) => {
          return (
            new Date(b.replace(/년 |월/g, "")) -
            new Date(a.replace(/년 |월/g, ""))
          );
        })
        .slice(0, 12);

      setAvailableMonths(sortedMonths);
      setSelectedMonth(sortedMonths[0] || ""); // 최신 월을 기본 선택
    };

    // 사용자 데이터 가져오기
    const fetchUserData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      } else {
        console.log("사용자 데이터가 없습니다.");
      }
    };

    fetchAvailableMonths(); // 월 목록 가져오기
    fetchUserData(); // 사용자 데이터 가져오기
  }, [user]); // 사용자가 변경되었을 때만 실행

  // 선택된 월에 맞는 급여 데이터 가져오기
  const fetchSalaryData = async (month) => {
    if (!month) return;

    const docRef = doc(db, "salaries", user.uid, "months", month);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSalaryData(docSnap.data());
    } else {
      setSalaryData({
        netSalary: 0,
        payments: [],
        deductions: [],
      });
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchSalaryData(selectedMonth); // 월이 선택되었을 때 급여 데이터 업데이트
    }
  }, [selectedMonth]);

  if (!salaryData || !userInfo) return <div>로딩 중...</div>; // 로딩 상태 처리

  const { employeeId, name, location, position, hiredDate } = userInfo || {};

  // 입사일 포맷팅
  const formattedhiredDate =
    hiredDate instanceof Timestamp
      ? new Date(hiredDate.seconds * 1000).toISOString().split("T")[0]
      : "입사일 없음";

  return (
    <>
      <PageTitle title="급여 확인" />
      <ContentBox>
        <InfoWrap>
          <MyInfo>
            <span>사번 : {employeeId || "사번 없음"}</span>
            <span>{name || "이름 없음"} </span>
            <span>
              {location || "위치 없음"} / {position || "직책 없음"}{" "}
            </span>
            <span>입사일 : {formattedhiredDate}</span>
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
            <Right>
              {salaryData ? salaryData.netSalary.toLocaleString() : 0} 원
            </Right>
          </SalaryCalcBox>
        )}
        <CalcWrapper>
          <CalcBox
            type="payments"
            data={salaryData ? salaryData.payments : []} // 지급 내역
          />
          <CalcBox
            type="deductions"
            data={salaryData ? salaryData.deductions : []} // 공제 내역
          />
        </CalcWrapper>
      </ContentBox>
    </>
  );
};

export default MySalary;
