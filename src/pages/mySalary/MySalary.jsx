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
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, setUserInfo } from "../../store/userSlice";

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
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo); // Redux 상태에서 바로 가져오기
  const [salaryData, setSalaryData] = useState(null);
  //const [userInfo, setUserInfo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("2025년 2월");
  const [availableMonths, setAvailableMonths] = useState([]); // 추가

  const user = auth.currentUser;

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
    }; // 전체 추가

    // 사용자 데이터 가져오기 (단, Redux에 데이터가 없을 때만 Firebase 요청)
    const fetchUserData = async () => {
      if (!user || !userInfo) return;

      // Redux에 employeeId, hiredDate, location이 없을 때만 Firebase 요청
      if (!userInfo.employeeId || !userInfo.hiredDate || !userInfo.location) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const newUserInfo = docSnap.data();

          // Redux 상태와 비교 후 다를 때만 업데이트
          if (
            !userInfo.employeeId ||
            !userInfo.hiredDate ||
            !userInfo.location
          ) {
            dispatch(setUserInfo({ ...userInfo, ...newUserInfo }));
            console.log("Redux에 부족한 데이터만 보완");
          }
        }
      }
    };

    fetchAvailableMonths();
    fetchUserData();
  }, [user, userInfo, dispatch]); // userInfo가 변경될 때만 Redux 요청

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
      fetchSalaryData(selectedMonth);
    }
  }, [selectedMonth]);

  if (!salaryData || !userInfo) return <div>로딩 중...</div>;

  const { employeeId, name, location, position, hiredDate } = userInfo;

  // 입사일 포맷팅
  const formattedHiredDate = hiredDate
    ? hiredDate instanceof Timestamp
      ? new Date(hiredDate.seconds * 1000).toISOString().split("T")[0] // Timestamp 객체 처리
      : new Date(hiredDate).toISOString().split("T")[0] // 문자열로 된 날짜 처리
    : "입사일 없음"; // hiredDate가 없는 경우 처리

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
