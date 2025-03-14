import styled from "styled-components";

const StyledTitleWrap = styled.div`
  margin-top: 50px;

  &.login {
    margin-top: 27px;
  }
`;

const StyledTitle = styled.h1`
  font-size: var(--font-size-title-large);
  font-weight: 500;
  letter-spacing: -0.64px;
  color: var(--text-primary);
`;

const StyledSubTitle = styled.h2`
  margin-top: 37px;
  font-size: var(--font-size-title-medium);
  font-weight: 700;
  letter-spacing: -0.48px;
  color: var(--text-disabled);
  line-height: 45px;
`;

const PageTitle = ({ title, subtitle, className }) => {
  return (
    <StyledTitleWrap className={className}>
      <StyledTitle>{title}</StyledTitle>
      {subtitle && <StyledSubTitle>{subtitle}</StyledSubTitle>}
    </StyledTitleWrap>
  );
};

export default PageTitle;
