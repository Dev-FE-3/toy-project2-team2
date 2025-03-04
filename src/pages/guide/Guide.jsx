import React, { useState } from "react";
import Button from "../../shared/components/Button";
import TextArea from "../../shared/components/TextArea";
import Input from "../../shared/components/Input";
import LoginInput from "../auth/LoginInput";
import PageTitle from "../../shared/components/PageTitle";
import SelectBox from "../../shared/components/SelectBox";
import DatePicker from "../../shared/components/DatePicker";
import useModal from "../../shared/components/modal/useModal";
import Modal from "../../shared/components/modal/Modal";

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

  const [fullDate, setFullDate] = useState(new Date()); // 년/월/일 선택
  const [yearMonth, setYearMonth] = useState(new Date()); // 년/월 선택
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
      <h1>1. page title</h1>
      <PageTitle title="페이지명1" />
      <PageTitle title="페이지명2" subtitle="페이지 설명" />

      <h1>2. button</h1>
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

      <h1>3. input</h1>
      <p>코드상 위에 상태 관련 설명 있어요</p>
      <Input
        id="name1"
        label
        isSubmitted={isSubmitted}
        placeholder="라벨 안 줄 때"
      />
      <br />
      <Input
        id="name2"
        label="라벨 쓸 때 넣으세요"
        isSubmitted={isSubmitted}
        placeholder="라벨 쓸 때"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={isSubmitted}>
        제출
      </Button>
      <Button onClick={handleEdit} color="gray">
        수정하기
      </Button>

      <h1>4. LoginInput</h1>
      <LoginInput placeholder="login input 입니다" />
      <LoginInput type="email" placeholder="email" />
      <LoginInput type="password" placeholder="password" />

      <h1>5. textarea</h1>
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

      <h1>6. Select box</h1>
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

      <h1>7. Date</h1>
      <DatePicker type="date" value={fullDate} onChange={setFullDate} />
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

      <h1>8. Modal</h1>
      <ScheduleRegisterButton />
      <ScheduleCheckButton />
    </>
  );
};

export default Guide;
