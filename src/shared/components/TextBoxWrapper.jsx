import styled from "styled-components";

const TextBoxWrapper = styled.textarea`
  width: 100%;
  height: 100%; // height 관련 modal에 적용하면서 봐주세요
  padding: 10px 15px;
  border-radius: 8px;
  color: var(--Text-Primary);
  font-size: var(--font-size-primary);
  font-weight: 400;
  line-height: 24px; /* 150% */
  background-color: var(--background-color-3);
  border: 1px solid var(--disabled);

  &:focus {
    border-color: var(--accent);
    background-color: var(--white);
  }

  &:disabled {
    background-color: var(--white);
    pointer-events: none;
  }
`;

const TextBox = ({ disabled, placeholder = "내용을 입력하세요" }) => {
  return (
    <TextBoxWrapper
      maxLength={100} // 우선 100 설정
      type="text"
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default TextBox;
