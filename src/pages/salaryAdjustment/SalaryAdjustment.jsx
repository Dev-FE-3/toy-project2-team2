import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../shared/firebase"; // Firebase 설정 파일
import PageTitle from "../../shared/components/PageTitle";
import styled from "styled-components";
import Button from "../../shared/components/Button";
import SelectBox from "../../shared/components/SelectBox";
import DatePicker from "../../shared/components/DatePicker";
import useModal from "../../shared/components/modal/useModal";
import Modal from "../../shared/components/modal/Modal";
import TextArea from "../../shared/components/TextArea";

const TitleContainer = styled.div`
  position: relative;

  .registerBtn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  margin-top: 45px;
  margin-bottom: 138px;
  text-align: center;
  font-size: var(--font-size-title-small);
  font-weight: 500;
  border-spacing: 10px;
  border-top: 2px solid var(--background-color);
  border-bottom: 2px solid var(--background-color);

  thead {
    display: table;
    table-layout: fixed;
    width: 100%;
    border-bottom: 2px solid var(--background-color);

    &::after {
      content: "";
      display: block;
      height: 10px;
    }

    tr {
      border-bottom: 2px solid var(--background-color);

      th {
        color: var(--text-secondary);
      }
    }
  }

  tbody {
    display: block;
    max-height: 480px;
    overflow-y: scroll;

    tr {
      display: table;
      width: 100%;
      table-layout: fixed;

      //내역 확인 hover 속성
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: var(--background-color-3);
      }

      td {
        color: var(--text-disabled);

        &:nth-child(3) {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  th,
  td {
    width: 20%;
    padding: 24px;

    &:nth-child(3) {
      width: 40%;
    }
  }
`;

const StatusCell = styled.span`
  display: inline-block;
  width: 96px;
  padding: 7px;
  border-radius: 8px;
  color: ${(props) =>
    props.$status === "정정 완료"
      ? "var(--blue)"
      : props.$status === "정정 불가"
      ? "var(--text-disabled)"
      : props.$status === "대기 중"
      ? "var(--green)"
      : "var(--text-secondary)"};
  background-color: ${(props) =>
    props.$status === "정정 완료"
      ? "var(--blue-bg)"
      : props.$status === "정정 불가"
      ? "var(--background-color)"
      : props.$status === "대기 중"
      ? "var(--green-bg)"
      : "transparent"};
  box-sizing: border-box;
`;

const leaveOptions = ["유급휴가", "무급휴가", "연차", "병가", "기타"];

const ScheduleRegisterContent = ({
  yearMonth,
  selectedLeaveType,
  inputValue,
  setYearMonth,
  setSelectedLeaveType,
  setInputValue,
}) => {
  return (
    <div>
      <label>정정 대상</label>
      <DatePicker type="year-month" value={yearMonth} onChange={setYearMonth} />
      <label>정정 유형</label>
      <SelectBox
        options={leaveOptions}
        defaultOption={selectedLeaveType}
        onSelect={setSelectedLeaveType}
        size="large"
      />
      <TextArea
        id="reason"
        label="정정 사유"
        placeholder="정정 사유를 입력하세요."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </div>
  );
};

const ScheduleRegisterButton = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [yearMonth, setYearMonth] = useState(new Date());
  const [selectedLeaveType, setSelectedLeaveType] = useState("유형");
  const [inputValue, setInputValue] = useState("");

  const handleRegister = async (userId, date, type, reason) => {
    try {
      const collectionRef = collection(db, "salary_requests");
      await addDoc(collectionRef, {
        userId,
        date: date.toISOString().split("T")[0],
        type,
        reason,
        status: "대기 중",
        createdAt: new Date(),
      });

      alert("정정 신청이 완료되었습니다!");
      onClose();
    } catch (error) {
      console.error("정정 신청 오류:", error);
      alert("정정 신청에 실패했습니다.");
    }
  };

  const handleSubmit = () => {
    if (selectedLeaveType === "유형" || inputValue.trim() === "") {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    handleRegister(userId, yearMonth, selectedLeaveType, inputValue);
  };

  return (
    <>
      <Button onClick={onOpen} className="registerBtn">
        정정 신청
      </Button>
      {isOpen && (
        <Modal
          title="정정 신청"
          content={
            <ScheduleRegisterContent
              yearMonth={yearMonth}
              selectedLeaveType={selectedLeaveType}
              inputValue={inputValue}
              setYearMonth={setYearMonth}
              setSelectedLeaveType={setSelectedLeaveType}
              setInputValue={setInputValue}
            />
          }
          hasSubmitButton={true}
          onSubmit={handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
          SubmitButton={"등록하기"}
        />
      )}
    </>
  );
};

const SalaryAdjustment = () => {
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState(null);
  const { isOpen, onOpen, onClose } = useModal();
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const collectionRef = collection(db, "salary_requests");
    const q = query(
      collectionRef,
      where("userId", "==", userId), // userId 기준으로 필터링
      orderBy("createdAt", "desc") // createdAt을 기준으로 내림차순 정렬
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedRequests = querySnapshot.docs.map((doc) => ({
        id: doc.id, // 문서 ID 추가
        ...doc.data(),
      }));
      setRequests(fetchedRequests);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleRowClick = (request) => {
    //정정 내역 모달
    setSelectedRequest(request);
    onOpen();
  };

  return (
    <>
      <TitleContainer>
        <PageTitle title="정정 신청 / 내역" subtitle="정정 내역" />
        <ScheduleRegisterButton userId={userId} className="registerBtn" />
      </TitleContainer>
      <Table>
        <thead>
          <tr>
            <th>정정 대상</th>
            <th>정정 유형</th>
            <th>정정 사유</th>
            <th>처리 상태</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request, index) => {
              const date = new Date(request.date);
              const formattedDate = `${date.getFullYear()} / ${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}`;

              return (
                <tr key={index} onClick={() => handleRowClick(request)}>
                  <td>{formattedDate}</td>
                  <td>{request.type}</td>
                  <td title={request.reason}>{request.reason}</td>
                  <td>
                    <StatusCell $status={request.status}>
                      {request.status}
                    </StatusCell>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">신청된 정정 내역이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {isOpen && selectedRequest && (
        <Modal
          title="정정 내역 확인"
          content={
            <div>
              <p>
                <strong>정정 대상:</strong> {selectedRequest.date}
              </p>
              <p>
                <strong>정정 유형:</strong> {selectedRequest.type}
              </p>
              <p>
                <strong>정정 사유:</strong> {selectedRequest.reason}
              </p>
              <p>
                <strong>처리 상태:</strong> {selectedRequest.status}
              </p>
            </div>
          }
          hasSubmitButton={false}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default SalaryAdjustment;
