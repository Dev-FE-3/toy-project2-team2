import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../shared/firebase"; // Firebase 설정 파일
import PageTitle from "../../shared/components/PageTitle";
import styled from "styled-components";
import RegisterModalButton from "./components/SalaryRegisterModal";
import SalaryHistoryModal from "./components/SalaryHistoryModal";

// 제목과 버튼 컨테이너 스타일 정의
const TitleContainer = styled.div`
  position: relative;

  .registerBtn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

// 급여 정정 내역을 표시하는 테이블 스타일 정의
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

// 정정 상태별 스타일을 지정하는 컴포넌트
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

const SalaryAdjustment = () => {
  const [requests, setRequests] = useState([]); // 급여 정정 요청 목록 상태
  const [userId, setUserId] = useState(null); // 현재 로그인한 사용자 ID 상태
  const [selectedRequest, setSelectedRequest] = useState(null); // 선택된 정정 요청 상태

  // 사용자의 로그인 상태를 감지하여 userId 설정
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Firestore에서 현재 사용자의 급여 정정 신청 내역을 가져오는 함수
  useEffect(() => {
    if (!userId) return;

    const collectionRef = collection(db, "salary_requests");
    const q = query(
      collectionRef,
      where("userId", "==", userId), // 현재 로그인한 사용자의 정정 요청만 가져오기
      orderBy("createdAt", "desc") // 생성 날짜 기준으로 내림차순 정렬
    );

    // 실시간으로 데이터 가져오기
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedRequests = querySnapshot.docs.map((doc) => ({
        id: doc.id, // 문서 ID 추가
        ...doc.data(),
      }));
      setRequests(fetchedRequests);
    });

    return () => unsubscribe();
  }, [userId]);

  // 특정 정정 내역을 클릭했을 때 해당 데이터를 모달에 전달하여 표시
  const handleRowClick = (request) => {
    setSelectedRequest(request);
  };

  return (
    <>
      {/* 페이지 제목 및 정정 신청 버튼 */}
      <TitleContainer>
        <PageTitle title="정정 신청 / 내역" subtitle="정정 내역" />
        <RegisterModalButton userId={userId} className="registerBtn" />
        <RegisterModalButton userId={userId} className="registerBtn" />
      </TitleContainer>

      {/* 정정 내역 테이블 */}
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

      {/* 정정 내역 상세 모달 */}
      {selectedRequest && (
        <SalaryHistoryModal selectedRequest={selectedRequest} />
      )}
    </>
  );
};

export default SalaryAdjustment;
