import styled from "styled-components";

const TextBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: var(--font-size-primary);
  font-weight: 400;
  color: var(--text-disabled);
  display: block;
  margin-bottom: 16px;
`;

const TextBoxArea = styled.textarea`
  width: 100%;
  height: 100%; /* modal에 맞게 수정 필요 */
  padding: 10px 15px;
  border-radius: 8px;
  color: var(--text-primary);
  font-size: var(--font-size-primary);
  font-weight: 400;
  line-height: 24px; /* 150% */
  background-color: var(--background-color-3);
  border: 1px solid var(--disabled);
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    border-color: var(--accent);
    background-color: var(--white);
    color: var(--text-primary);
  }

  ${(props) =>
    props.$issubmitted &&
    `
      border: 1px solid var(--disabled);
      background-color: var(--white);
      color: var(--text-primary);
      pointer-events: none;
    `}

  &:disabled {
    background-color: var(--white);
    pointer-events: none;
  }
`;

const TextArea = ({
  id,
  label,
  isSubmitted,
  disabled,
  placeholder = "내용을 입력하세요",
  onChange,
}) => {
  return (
    <TextBoxWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TextBoxArea
        id={id}
        maxLength={100} // 우선 100 설정
        disabled={disabled}
        placeholder={placeholder}
        $issubmitted={isSubmitted} // 'isSubmitted' 값을 전달
        onChange={onChange} // 입력값 처리
      />
    </TextBoxWrapper>
  );
};

export default TextArea;
