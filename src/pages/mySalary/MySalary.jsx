import styled from "styled-components";
import PageTitle from "../../shared/components/titles/PageTitle";
import CalcBox from "./CalcBox";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import SelectBox from "../../shared/components/SelectBox";
//import useSalaryUpdate from "./useSalaryUpdate";
//import useUserUpdate from "./useUserUpdate";

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

const MonthSort = styled.div``;

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
  //useSalaryUpdate();
  //useUserUpdate();
  const [salaryData, setSalaryData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("2025년 2월"); // 기본 값 설정

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      console.log("사용자 정보 없음");
      return;
    }

    const fetchSalaryData = async () => {
      const docRef = doc(db, "salaries", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSalaryData(docSnap.data());
      } else {
        console.log("급여 데이터가 없습니다.");
      }
    };

    const fetchUserData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      } else {
        console.log("사용자 데이터가 없습니다.");
      }
    };

    fetchSalaryData();
    fetchUserData();
  }, [user]);

  useEffect(() => {
    // 선택된 달이 바뀌면 콘솔에 찍히게 처리
    console.log("선택된 달:", selectedMonth);
    // 여기서 해당 달에 맞는 데이터를 가져오는 로직 추가할 수 있음
    fetchData(selectedMonth);
  }, [selectedMonth]); // selectedMonth가 변경될 때마다 실행됨

  const fetchData = (month) => {
    console.log(`${month}에 맞는 데이터를 불러옴`);
    // 예시로, 이곳에 해당 월에 맞는 데이터를 불러오는 로직 추가
  };

  if (!salaryData || !userInfo) return <div>로딩 중...</div>;

  const { employeeId, name, location, position, hiredDate } = userInfo || {};

  const formattedhiredDate =
    hiredDate instanceof Timestamp
      ? new Date(hiredDate.seconds * 1000).toISOString().split("T")[0]
      : "입사일 없음";

  const Options2 = [
    { year: 2025, month: 2 },
    { year: 2025, month: 1 },
    { year: 2024, month: 12 },
    { year: 2024, month: 11 },
    { year: 2024, month: 10 },
  ];
  const handleSelectOption = (selectedValue) => {
    const [year, month] = selectedValue.split("년 "); // "년"을 기준으로 분리
    const monthValue = month.split("월")[0]; // "월"을 기준으로 다시 분리
    console.log(`선택된 년: ${year}, 월: ${monthValue}`);
  };

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
            options={Options2.map(
              (option) => `${option.year}년 ${option.month}월`
            )} // 텍스트로 변환
            defaultOption="2025년 2월"
            size="small"
            onSelect={handleSelectOption}
          />
        </InfoWrap>
        {salaryData && (
          <SalaryCalcBox>
            <Left>실 지급액</Left>
            <Right>{salaryData.netSalary.toLocaleString()} 원</Right>
          </SalaryCalcBox>
        )}
        <CalcWrapper>
          <CalcBox type="payments" data={salaryData.payments} />
          <CalcBox type="deductions" data={salaryData.deductions} />
        </CalcWrapper>
      </ContentBox>
    </>
  );
};

export default MySalary;
