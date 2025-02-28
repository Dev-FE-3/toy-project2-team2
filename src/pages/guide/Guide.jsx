import React, { useState } from "react";
import Button from "../../shared/components/button/Button";
import TextBox from "../../shared/components/TextBoxWrapper";
import styled from "styled-components";
import Input from "./../../shared/components/input/Input";
import LoginInput from "./../../shared/components/input/LoginInput";
import PageTitle from "../../shared/components/titles/PageTitle";
import StyledDatePicker from "../../shared/components/StyledDatePicker";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>일정 등록</Button>
      {isOpen && (
        <Modal
          title="일정 등록"
          content={<ScheduleRegisterContent />}
          hasSubmitButton
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const ScheduleCheckButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>일정 확인</Button>
      {isOpen && (
        <Modal
          title="일정 확인"
          content={<ScheduleCheckContent />}
          hasSubmitButton={false}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const Guide = () => {
  const [fullDate, setFullDate] = useState(null); // 년/월/일 선택
  const [yearMonth, setYearMonth] = useState(null); // 년/월 선택

  const handleFullDateChange = (date) => {
    setFullDate(date);
  };

  const handleYearMonthChange = (date) => {
    setYearMonth(date);
  };

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

      <h1>modal</h1>
      <h1>select box</h1>
      <h1>Date</h1>
      <StyledDatePicker type="date" onChange={handleFullDateChange} />
      <br></br>
      <StyledDatePicker type="year-month" onChange={handleYearMonthChange} />

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
      <ScheduleRegisterButton />
      <ScheduleCheckButton />
    </>
  );
};

export default Guide;
