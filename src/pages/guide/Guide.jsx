import React, { useState } from "react";
import Button from "../../shared/components/button/Button";
import TextArea from "../../shared/components/textArea";
import styled from "styled-components";
import Input from "./../../shared/components/input/Input";
import LoginInput from "./../../shared/components/input/LoginInput";
import PageTitle from "../../shared/components/titles/PageTitle";
import SelectBox from "../../shared/components/SelectBox";
import StyledDatePicker from "../../shared/components/StyledDatePicker";
import Modal from "../../shared/components/Modal";

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
  const Options1 = ["무급휴가", "연차", "병가", "기타"];
  const Options2 = [
    "2025년 2월",
    "2025년 3월",
    "2025년 4월",
    "2025년 5월",
    "2025년 6월",
    "2025년 7월",
  ];

  const [fullDate, setFullDate] = useState(null); // 년/월/일 선택
  const [yearMonth, setYearMonth] = useState(null); // 년/월 선택
  // input 관련 상태 - 입력 필드와 버튼을 제출 후 비활성화 할거야? false 입력 가능, true 비활성화
  const [isSubmitted, setIsSubmitted] = useState(false);
  // input 관련 상태 - 사용자가 입력한 값을 저장하는 상태 : setInputValue(e.target.value)로 업데이트
  const [inputValue, setInputValue] = useState("");
  // input 관련 상태 - 제출을 누르면 true - 비활성화
  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  // input 관련 상태 - 수정하기 누르면 수정이 가능하게 false - 활성화
  const handleEdit = () => {
    setIsSubmitted(false);
  };

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

      <h1>input</h1>
      <Input />
      <Input disabled placeholder="disabled input 입니다" />
      <LoginInput placeholder="login input 입니다" />
      <LoginInput type="email" placeholder="email" />
      <LoginInput type="password" placeholder="password" />

      <h1>textarea</h1>
      <br />
      <TextArea
        id="name"
        label="여기에 라벨 이름 다세용"
        isSubmitted={isSubmitted}
        placeholder="내용을 입력하세요"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={isSubmitted}>
        제출
      </Button>
      <Button onClick={handleEdit} color="gray">
        수정하기
      </Button>
      <br />
      <br />
      <br />
      <br />
      <h1>select box</h1>
      <SelectBox options={Options1} defaultOption="유형" size="large" />
      <SelectBox options={Options2} defaultOption="2025년 2월" size="small" />

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
      <h1>modal</h1>
      <ScheduleRegisterButton />
      <ScheduleCheckButton />
    </>
  );
};

export default Guide;
