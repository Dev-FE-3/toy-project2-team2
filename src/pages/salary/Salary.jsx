import styled from "styled-components";
import PageTitle from "../../shared/components/PageTitle";
import CalcBox from "./components/CalcBox";
import { auth, db } from "../../shared/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import SelectBox from "../../shared/components/SelectBox";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, setUserInfo } from "../../store/userSlice";
import useAvailableMonths from "./hooks/useAvailableMonths";
import useSalaryData from "./hooks/useSalaryData";
import formatHiredDate from "./utils/formatHiredDate";
import LoadingScreen from "../../shared/components/LoadingScreen";

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

const Salary = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo); // Redux 상태에서 바로 가져오기
  const user = auth.currentUser;
  const { months, selectedMonth, setSelectedMonth, isLoadingMonths } =
    useAvailableMonths(user?.uid);
  const { salaryData, isLoadingSalaryData } = useSalaryData(
    user?.uid,
    selectedMonth
  );
  const { employeeId, name, location, position, hiredDate } = userInfo;
  const formattedHiredDate = formatHiredDate(hiredDate);

  useEffect(() => {
    if (!user) {
      console.log("사용자 정보 없음");
      return;
    }

    // Redux 상태가 충분하지 않으면 Firebase에서 데이터 가져오기
    if (!userInfo.employeeId || !userInfo.hiredDate || !userInfo.location) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(setUserInfo(docSnap.data()));
        }
      };

      fetchUserData();
    }
  }, [user, userInfo, dispatch]);

  // 전체 화면 LoadingScreen 표시
  if (!userInfo || isLoadingMonths || isLoadingSalaryData) {
    return <LoadingScreen />;
  }

  return (
    <>
      <PageTitle title="급여 확인" />
      <ContentBox>
        <InfoWrap>
          <MyInfo>
            <span>사번 : {employeeId || "사번 없음"}</span>
            <span>이름 : {name || "이름 없음"}</span>
            <span>
              {location || "위치 없음"} / {position || "직책 없음"}
            </span>
            <span>입사일 : {formattedHiredDate}</span>
          </MyInfo>

          {isLoadingMonths ? (
            <span>로딩 중...</span>
          ) : (
            <SelectBox
              options={months.length > 0 ? months : ["없음"]}
              defaultOption={months.length > 0 ? selectedMonth : "없음"}
              size="small"
              onSelect={(value) => setSelectedMonth(value)}
            />
          )}
        </InfoWrap>
        <SalaryCalcBox>
          <Left>실 지급액</Left>
          <Right>
            {isLoadingSalaryData
              ? "로딩 중..."
              : salaryData
              ? salaryData.netSalary.toLocaleString()
              : "0"}{" "}
            원
          </Right>
        </SalaryCalcBox>
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

export default Salary;
