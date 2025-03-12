import styled from 'styled-components'

const StyledButton = styled.button`
	padding: ${({ size }) => 
		size === "sm" ? "8px 10px" :
    size === "lg" ? "17px" : "8px 16px"};
	font-size: ${({ size }) =>
    size === "sm" ? "16px" : "20px"};
	border-radius: 8px;
	font-weight: 700;
	background-color: ${({ color }) =>
    color === "gray" ? "var(--background-color)" : "var(--primary)"};
	color: ${({ color }) =>
    color === "gray" ? "var(--text-disabled)" : "var(--white)"};
	cursor: pointer;

	&:hover {
		background-color: ${({ color }) =>
      color === "gray" ? "var(--disabled)" : "var(--primary-dark)"};
	}

  &:disabled {
		opacity: 0.3;
    pointer-events: none;
  }
`

const Button = ({ color, size, type="button", children, ...props }) => {
  return (
    <StyledButton color={color} size={size} type={type} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button