import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../shared/firebase"; // Firebase 설정 파일
import { rolesPermissions } from "../../shared/config/rolesPermissions";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userSlice";
import LoadingScreen from "../../shared/components/LoadingScreen";
import SalaryHistoryModal from "./components/SalaryHistoryModal";
import SalaryManagementModal from "./components/SalaryManagementModal";
import SalaryTable from "./components/SalaryTable";
import TitleContainer from "./components/TitleContainer";

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
      <TitleContainer
        userPosition={userPosition}
        userEmployeeId={userEmployeeId}
        userName={userName}
        userId={userId}
        rolesPermissions={rolesPermissions} // rolesPermissions을 props로 전달
      />
      <SalaryTable
        userPosition={userPosition}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        requests={requests}
        filteredRequests={filteredRequests}
        handleRowClick={handleRowClick}
      />
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
