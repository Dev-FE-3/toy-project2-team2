import { useEffect, useState } from "react";
import { db, auth } from "../../../shared/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const useSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const schedulesQuery = query(
      collection(db, "schedules"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(schedulesQuery, (snapshot) => {
      const schedules = snapshot.docs.map((doc) => {
        const { userId, title, startDate, endDate, selectedColor, contents } = doc.data();
        return {
          userId,
          title,
          startDate: startDate.toDate(),
          endDate: endDate.toDate(),
          selectedColor,
          contents,
          id: doc.id,
        };
      });
      schedules.sort((a, b) => a.startDate - b.startDate);

      setSchedules(schedules);
    });

    return () => unsubscribe();
  }, []);

  return schedules;
};

export default useSchedules;
