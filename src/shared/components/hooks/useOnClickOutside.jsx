// import { useEffect } from "react";

// export const useOnClickOutside = (ref, handler) => {
//   useEffect(() => {
//     const listener = (event) => {
//       if (!ref.current || ref.current.contains(event.target)) return;
//       handler(); // 바깥 클릭 시 실행
//     };

//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener);

//     return () => {
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, handler]);
// };

// export default useOnClickOutside;
