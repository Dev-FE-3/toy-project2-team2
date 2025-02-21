import { styled } from "styled-components";

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%; /* 부모 요소의 너비에 맞게 100%로 설정 */
  height: 22px; /* 원하는 높이로 고정 */
  font-size: 16px;
  margin-bottom: 20px;
  color: var(--text-primary);
  &::placeholder {
    color: var(--text-disabled); /* 입력 전 placeholder 색상 */
  }
  align-self: stretch;
  box-sizing: border-box; /* padding과 border를 포함하여 총 크기 계산 */
`;

export default Input;
