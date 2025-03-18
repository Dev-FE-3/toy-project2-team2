import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { selectUserInfo, setUserInfo } from '../../store/userSlice';
import { auth, db } from '../firebase';

const DispatchUserWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;

      if (
        !userInfo ||
        !userInfo.name ||
        !userInfo.position ||
        !userInfo.employeeId
      ) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const newUserInfo = docSnap.data();

            // 기존 Redux 상태와 비교 후 변경된 경우에만 업데이트
            if (JSON.stringify(userInfo) !== JSON.stringify(newUserInfo)) {
              dispatch(setUserInfo(newUserInfo));
            }
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [user, dispatch, userInfo]);

  // children을 렌더링하는 부분
  return <>{children}</>;
};

export default DispatchUserWrapper;
