import React from "react";
import styled from "styled-components";
import PageTitle from "../../../shared/components/PageTitle";
import RegisterModalButton from "../components/SalaryRegisterModal";

const TitleContainer = styled.div`
  position: relative;

  .registerBtn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const TitleContainerComponent = ({
  position,
  employeeId,
  name,
  userId,
  rolesPermissions, // props로 받아옵니다.
}) => (
  <TitleContainer>
    <PageTitle title="정정 신청 / 내역" subtitle="정정 내역" />
    {rolesPermissions[position] && rolesPermissions[position].canConfirm ? (
      ""
    ) : (
      <RegisterModalButton
        employeeId={employeeId}
        name={name}
        userId={userId}
        className="registerBtn"
      />
    )}
  </TitleContainer>
);

export default TitleContainerComponent;
