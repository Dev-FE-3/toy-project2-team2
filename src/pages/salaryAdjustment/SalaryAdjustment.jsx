import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../shared/firebase"; // Firebase 설정 파일
import { rolesPermissions } from "../../shared/config/rolesPermissions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, setUserInfo } from "../../store/userSlice";
import LoadingScreen from "../../shared/components/LoadingScreen";
import SalaryHistoryModal from "./components/SalaryHistoryModal";
import SalaryManagementModal from "./components/SalaryManagementModal";
import SalaryTable from "./components/SalaryTable";
import TitleContainer from "./components/TitleContainer";

const SalaryAdjustment = () => {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState("전체");
  const userInfo = useSelector(selectUserInfo);
  const user = auth.currentUser;
  const { employeeId, position, name } = userInfo;

  useEffect(() => {
    if (!user) {
      console.log("사용자 정보 없음");
      return;
    }

    // Redux 상태가 충분하지 않으면 Firebase에서 데이터 가져오기
    if (!userInfo.employeeId || !userInfo.position || !userInfo.name) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(setUserInfo(docSnap.data()));
        }
      };

      fetchUserData();
    }
  }, [
    user,
    userInfo?.employeeId,
    userInfo?.position,
    userInfo?.name,
    dispatch,
  ]);

  // 급여 요청 데이터 가져오기
  useEffect(() => {
    if (!user) return;
    const collectionRef = collection(db, "salary_requests");

    const q =
      position === "매니저"
        ? query(collectionRef, orderBy("createdAt", "desc"))
        : query(
            collectionRef,
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setRequests(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsubscribe();
  }, [user, position]);

  if (!position) return <LoadingScreen />;

  //정정 내역 모달 열기
  const handleRowClick = (request) => {
    setSelectedRequest(request);
  };
  const filteredRequests =
    statusFilter === "전체"
      ? requests
      : requests.filter((request) => request.status === statusFilter);
  return (
    <>
      <TitleContainer
        position={position}
        employeeId={employeeId}
        name={name}
        userId={user?.uid}
        rolesPermissions={rolesPermissions} // rolesPermissions을 props로 전달
      />
      <SalaryTable
        position={position}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        requests={requests}
        filteredRequests={filteredRequests}
        handleRowClick={handleRowClick}
      />
      {selectedRequest &&
        (rolesPermissions[position].canConfirm ? (
          <SalaryManagementModal
            setSelectedRequest={setSelectedRequest}
            selectedRequest={selectedRequest}
            name={selectedRequest.name}
            employeeId={selectedRequest.employeeId}
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
