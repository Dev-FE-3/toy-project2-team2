import styled from "styled-components";

const Label = styled.label`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px solid ${({ $isSelected }) => ($isSelected ? "var(--text-disabled-2)" : "var(--white)")};
  background: ${({ color }) =>
    color === "orange" ? "linear-gradient(to right, var(--orange) 50%, var(--orange-bg) 50%)" :
    color === "regular" ? "linear-gradient(to right, var(--regular) 50%, var(--regular-bg) 50%)" :
    color === "red" ? "linear-gradient(to right, var(--red) 50%, var(--red-bg) 50%)" :
    color === "green" ? "linear-gradient(to right, var(--green) 50%, var(--green-bg) 50%)" :
    color === "blue" ? "linear-gradient(to right, var(--blue) 50%, var(--blue-bg) 50%)" : "transparent"};
  cursor: pointer;
`

const Input = styled.input`
  display: none;
`

const LabelColor = ({ color, selectedColor, onSelect }) => {
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
      />
    </>
  );
};

export default LabelColor