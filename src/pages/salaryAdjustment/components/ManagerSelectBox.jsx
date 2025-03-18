import React from "react";
import SelectBox from "../../../shared/components/SelectBox";

const STATE_OPTIONS = ["전체", "대기 중", "정정 완료", "정정 불가"];
const ManagerSelectBox = ({ statusFilter, setStatusFilter }) => {
  return (
    <SelectBox
      id="salary-type"
      options={STATE_OPTIONS}
      defaultOption={statusFilter}
      onSelect={setStatusFilter}
      size="autoSmall"
    />
  );
};

export default ManagerSelectBox;
