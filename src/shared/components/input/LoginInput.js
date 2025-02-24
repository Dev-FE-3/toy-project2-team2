import { styled } from "styled-components";

const Input = styled.input`
  padding: 10px 20px;
  border: none;
  width: 100%;
  height: auto;
  font-size: var(--font-size-title-small);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.36px;
  margin-bottom: 20px;
  color: var(--text-primary);
  &::placeholder {
    color: var(--text-disabled-2); /* placeholder 색상 */
  }
  align-self: stretch;
  box-sizing: border-box;
`;

export default Input;
