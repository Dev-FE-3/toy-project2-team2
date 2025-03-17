import styled from "styled-components";

const ScheduleBarWrapper = styled.span`
  display: block;
  position: relative;
  width: ${({ colSpan }) => `calc(${colSpan * 100}% + ${(colSpan - 1) * 1}px)`};
  z-index: ${({ colSpan }) => (colSpan === 1 ? 0 : 1)};
  height: 28px;
  padding: 3px 12px;
  font-size: var(--font-size-title-small);
  font-weight: 700;
  letter-spacing: -0.36px;
  color: ${({ color }) => 
    color ? `var(--${color})` : "var(--text-primary)"};
  background-color: ${({ $empty, color }) => 
    $empty === "" ? "transparent" :
    color ? `var(--${color}-bg)` : "var(--white)"};
  border-radius: 4px;
  box-sizing: border-box;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  & + span {
    margin-top: 6px;
  }

  ${({ $empty }) =>
    $empty === "" &&
    `
      pointer-events: none;
    `
  }
`;

const ScheduleBar = ({ colSpan, color, onClick, $empty, title }) => {
  return (
    <ScheduleBarWrapper
      colSpan={colSpan}
      color={color}
      onClick={onClick}
      $empty={$empty}
    >
      {title}
    </ScheduleBarWrapper>
  );
};

export default ScheduleBar;
