import React, { useState } from "react";
import Button from "../../shared/components/button/Button";
import TextBox from "../../shared/components/TextBoxWrapper";
import styled from "styled-components";
import Input from "./../../shared/components/input/Input";
import LoginInput from "./../../shared/components/input/LoginInput";
import PageTitle from "../../shared/components/titles/PageTitle";
import SelectBox from "../../shared/components/SelectBox";
import DatePicker from "../../shared/components/DatePicker";
import useModal from "../../shared/components/hooks/useModal";
import Modal from "../../shared/components/Modal";

const Wrapper = styled.div`
  width: 150px;
  height: 150px;
`;

const ScheduleRegisterContent = () => (
  <div>
    <p>일정을 등록하는 방법:</p>
    <ul>
      <li>날짜 선택</li>
      <li>시간 입력</li>
      <li>메모 작성</li>
    </ul>
  </div>
);

const ScheduleCheckContent = () => (
  <div>
    <p>일정 확인 페이지입니다.</p>
    <p>등록된 일정 목록을 확인하세요.</p>
  </div>
);

const ScheduleRegisterButton = () => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <>
      <Button onClick={onOpen}>일정 등록</Button>
      {isOpen && (
        <Modal
          title="일정 확인"
          content={<ScheduleRegisterContent />}
          hasSubmitButton={true}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

const ScheduleCheckButton = () => {
  const { isOpen, onOpen, onClose } = useModal(); // isOpen, onClose 추가

  return (
    <>
      <Button onClick={onOpen}>일정 확인</Button>
      {isOpen && (
        <Modal
          title="일정 확인"
          content={<ScheduleCheckContent />}
          hasSubmitButton={false}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

const Guide = () => {
  const [selectedLeaveType, setSelectedLeaveType] = useState("유형");
  const leaveOptions = ["무급휴가", "연차", "병가", "기타"];

  const [selectedMonth, setSelectedMonth] = useState("2025년 3월");
  const monthOptions = [
    "2025년 3월",
    "2025년 2월",
    "2025년 1월",
    "2024년 12월",
    "2024년 11월",
    "2024년 9월",
    "2024년 8월",
    "2024년 7월",
    "2024년 6월",
    "2024년 5월",
    "2024년 4월",
  ];

  const [fullDate, setFullDate] = useState(new Date());
  const [yearMonth, setYearMonth] = useState(new Date());

  return (
    <>
      <h1>page title</h1>
      <PageTitle title="페이지명1" />
      <PageTitle title="페이지명2" subtitle="페이지 설명" />

      <h1>button</h1>
      <Button size="sm">작은 버튼</Button>
      <Button size="sm" color="gray">
        작은 버튼
      </Button>
      <Button>기본 버튼</Button>
      <Button color="gray">기본 버튼</Button>
      <Button size="lg">큰 버튼</Button>
      <Button size="lg" color="gray">
        큰 버튼
      </Button>
      <h1>page title</h1>

      <h1>input</h1>
      <Input />
      <Input disabled placeholder="disabled input 입니다" />
      <LoginInput placeholder="login input 입니다" />
      <LoginInput type="email" placeholder="email" />
      <LoginInput type="password" placeholder="password" />

      <h1>textarea</h1>
      <Wrapper>
        <TextBox
          disabled={false}
          placeholder="임의로 입력하면 됩니다 wrapper가 있는 이유는 사이즈가 100%여서.."
        />
      </Wrapper>
      <br />
      <h1>Select box</h1>
      <SelectBox
        options={leaveOptions}
        defaultOption={selectedLeaveType}
        onSelect={setSelectedLeaveType} // 선택된 값 업데이트
        size="large"
      />
      <SelectBox
        options={monthOptions}
        defaultOption={selectedMonth}
        onSelect={setSelectedMonth} // 선택된 값 업데이트
        size="small"
      />

      <h1>Date</h1>
      <DatePicker type="date" value={fullDate} onChange={setFullDate} />
      <br></br>
      <DatePicker type="year-month" value={yearMonth} onChange={setYearMonth} />

      <h2>선택된 날짜</h2>
      <p>
        📆 년/월/일: {fullDate ? fullDate.toLocaleDateString() : "선택 안 됨"}
      </p>
      <p>
        📆 년/월:{" "}
        {yearMonth
          ? `${yearMonth.getFullYear()} / ${String(
              yearMonth.getMonth() + 1
            ).padStart(2, "0")}`
          : "선택 안 됨"}
      </p>
      <h1>Modal</h1>
      <ScheduleRegisterButton />
      <ScheduleCheckButton />
    </>
  );
};

export default Guide;
