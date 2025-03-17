import styled from "styled-components";

const Label = styled.label`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px solid ${({ $isSelected }) => ($isSelected ? "var(--text-disabled-2)" : "var(--white)")};
  background: ${({ color }) =>
    color ? `linear-gradient(to right, var(--${color}) 50%, var(--${color}-bg) 50%)` : "transparent"};
  cursor: pointer;

  ${(props) => props.$issubmitted && `
    pointer-events: none;
  `}
`

const Input = styled.input`
  display: none;
`

const LabelColor = ({ color, selectedColor, onSelect, isSubmitted }) => {
  return (
    <>
      <Input
        type="radio"
        id={`label-${color}`}
        name="label-group"
        checked={selectedColor === color}
        onChange={() => onSelect(color)}
      />
      <Label
        htmlFor={`label-${color}`}
        color={color}
        $isSelected={selectedColor === color}
        $issubmitted={isSubmitted}
      />
    </>
  );
};

export default LabelColor