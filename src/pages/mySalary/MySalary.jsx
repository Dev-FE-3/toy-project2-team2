import styled from "styled-components";
import PageTitle from "../../shared/components/titles/PageTitle";
import CalcBox from "./CalcBox";
import useSalaryUpdate from "./useSalaryUpdate";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const ContentBox = styled.div`
  margin-top: 30px;
`;

const InfoWrap = styled.div``;

const MyInfo = styled.div`
  color: var(--text-disabled);
  font-size: var(--font-size-primary);
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const MonthSort = styled.div``;

const SalaryCalcBox = styled.div`
  margin-top: 26px;
  display: flex;
  //width: 1240px;
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
  justify-content: space-between; /* 가로로 나열 */
  gap: 16px; /* 두 박스 사이의 간격 16px */
`;

const Left = styled.span``;

const Right = styled.span`
  text-align: right; /* 오른쪽 항목을 오른쪽 끝에 정렬 */
`;

const MySalary = () => {
  useSalaryUpdate();
  const [salaryData, setSalaryData] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchSalaryData = async () => {
      const docRef = doc(db, "salaries", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSalaryData(docSnap.data());
      } else {
        console.log("급여 데이터가 없습니다.");
      }
    };

    fetchSalaryData();
  }, [user]);

  if (!salaryData) return <div>Loading...</div>;

  return (
    <>
      <PageTitle title="급여 확인" />
      <ContentBox>
        <InfoWrap>
          <MyInfo>내 정보 여기에 firebase storage에서 불러와야 합니다</MyInfo>
          <MonthSort />
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
