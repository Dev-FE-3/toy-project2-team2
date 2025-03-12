import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../shared/firebase"; // Firebase 설정 파일
import PageTitle from "../../shared/components/PageTitle";
import styled from "styled-components";
import { rolesPermissions } from "../../shared/config/rolesPermissions";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userSlice";
import LoadingScreen from "../../shared/components/LoadingScreen";
import RegisterModalButton from "./components/SalaryRegisterModal";
import SalaryHistoryModal from "./components/SalaryHistoryModal";
import SalaryManagementModal from "./components/SalaryManagementModal";
import SelectBox from "../../shared/components/SelectBox";

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

      &:hover {
        background-color: var(--background-color-3);
      }

      td {
        color: var(--text-disabled);

        &:nth-last-child(2) {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:last-child {
          padding-right: 14px;
        }
      }
    }
  }

  th > div {
    width: 116px;
  }

  th > div > button {
    justify-content: space-around;
  }

  th {
    &:last-child{
      padding: 0 24px;
    }
  }

  th,
  td {
    width: 20%;
    padding: 24px;

    &:nth-last-child(2) {
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

const SalaryAdjustment = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const userInfo = useSelector(selectUserInfo);
  const [userEmployeeId, setUserEmployeeId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [userName, setUserName] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState("전체");

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedUserPosition = localStorage.getItem("userPosition");
    const savedUserName = localStorage.getItem("userName");
    const savedUserEmployeeId = localStorage.getItem("userEmployeeId");

    if (savedUserId && savedUserId !== userId) {
      setUserId(savedUserId);
    } else if (userInfo.uid && userInfo.uid !== userId) {
      setUserId(userInfo.uid);
    }

    if (savedUserPosition && savedUserPosition !== userPosition) {
      setUserPosition(savedUserPosition);
    } else if (userInfo.position && userInfo.position !== userPosition) {
      setUserPosition(userInfo.position);
    }

    if (savedUserName && savedUserName !== userName) {
      setUserName(savedUserName);
    } else if (userInfo.name && userInfo.name !== userName) {
      setUserName(userInfo.name);
    }
    if (savedUserEmployeeId && savedUserEmployeeId !== userEmployeeId) {
      setUserEmployeeId(savedUserEmployeeId);
    } else if (userInfo.employeeId && userInfo.employeeId !== userEmployeeId) {
      setUserEmployeeId(userInfo.employeeId);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userId) localStorage.setItem("userId", userId);
    if (userPosition) localStorage.setItem("userPosition", userPosition);
    if (userName) localStorage.setItem("userName", userName);
    if (userEmployeeId) localStorage.setItem("userEmployeeId", userEmployeeId);
  }, [userId, userPosition, userName, userEmployeeId]);

  useEffect(() => {
    if (!userId || userPosition === "매니저") return;

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

  useEffect(() => {
    const fetchRequests = async () => {
      // 1. salary_requests 컬렉션의 요청을 가져오기
      const collectionRef = collection(db, "salary_requests");
      const q = query(collectionRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const fetchedRequests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllRequests(fetchedRequests);
      });

      return () => unsubscribe();
    };

    fetchRequests();
  }, []);

  if (!userPosition) {
    return <LoadingScreen />;
  }
  //정정 내역 모달 열기
  const handleRowClick = (request) => {
    setSelectedRequest(request);
  };
  const filteredRequests =
    statusFilter === "전체"
      ? allRequests
      : allRequests.filter((request) => request.status === statusFilter);
  return (
    <>
      <TitleContainer>
        <PageTitle title="정정 신청 / 내역" subtitle="정정 내역" />
        {rolesPermissions[userPosition].canConfirm ? (
          ""
        ) : (
          <RegisterModalButton
            userEmployeeId={userEmployeeId}
            userName={userName}
            userId={userId}
            className="registerBtn"
          />
        )}
      </TitleContainer>
      <Table>
        <thead>
          <tr>
            {rolesPermissions[userPosition].canConfirm ? (
              <>
                <th>신청자</th>
                <th>신청 날짜</th>
                <th>정정 대상</th>
                <th>정정 사유</th>
                <th>
                  <SelectBox
                    id="salary-type"
                    options={["전체", "대기 중", "정정 완료", "정정 불가"]}
                    defaultOption={statusFilter}
                    onSelect={setStatusFilter}
                    size="autoSmall"
                  />
                </th>
              </>
            ) : (
              <>
                <th>정정 대상</th>
                <th>정정 유형</th>
                <th>정정 사유</th>
                <th>처리 상태</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rolesPermissions[userPosition].canConfirm ? (
            filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="4">신청된 정정 내역이 없습니다.</td>
              </tr>
            ) : (
              filteredRequests.map((request, index) => {
                const date = new Date(request.date);
                const formattedDate = `${date.getFullYear()} / ${(
                  date.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}`;

                return (
                  <tr key={index} onClick={() => handleRowClick(request)}>
                    <td>{request.userName}</td>
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
            )
          ) : requests.length === 0 ? (
            <tr>
              <td colSpan="4">신청된 정정 내역이 없습니다.</td>
            </tr>
          ) : (
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
          )}
        </tbody>
      </Table>

      {selectedRequest &&
        (rolesPermissions[userPosition].canConfirm ? (
          <SalaryManagementModal
            setSelectedRequest={setSelectedRequest}
            selectedRequest={selectedRequest}
            userName={selectedRequest.userName}
            userEmployeeId={selectedRequest.userEmployeeId}
          />
        ) : (
          <SalaryHistoryModal
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
          />
        ))}
    </>
  );
};

export default SalaryAdjustment;
