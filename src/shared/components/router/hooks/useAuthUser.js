import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const useAuthUser = () => {
  const [isLoading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserPosition(docSnap.data().position);
        } else {
          setUserPosition(null);
        }
      } else {
        setUserPosition(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { userPosition, isLoading };
};

export default useAuthUser;
