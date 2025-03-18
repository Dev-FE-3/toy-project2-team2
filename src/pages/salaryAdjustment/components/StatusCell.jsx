import styled from "styled-components";

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

export default StatusCell;
