// const ROLE = {
//   // READ: "READ", // 읽기 권한
//   // WRITE: "WRITE", // 쓰기 권한
//   // EDIT : "EDIT" // 편집 권한
// }

// 역할이 세 개 이상일 때 활용하면 적절할 것 같다.

export const rolesPermissions = {
  매니저 : {
    canConfirm: true,
  },
  트레이너: {
    canConfirm: false,
  },
  메이트: {
    canConfirm: false,
  },
};
