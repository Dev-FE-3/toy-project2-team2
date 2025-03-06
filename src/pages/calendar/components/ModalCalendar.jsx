import styled from "styled-components";
import Input from "../../../shared/components/Input";
import TextArea from "../../../shared/components/TextArea";
import DatePicker from "../../../shared/components/DatePicker";
import LabelColor from "./LabelColor";

const List = styled.dl`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  dt {
    width: 20%;
    margin-top: 20px;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      width: 100%;
    }

    label {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: var(--text-disabled);
    }
  }

  dd {
    width: 80%;
    margin-top: 20px;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      width: 100%;
      height: 118px;
      margin-top: 16px;
    }
  }
`

const LabelList = styled.ul`
  display: flex;
  gap: 12px;
`

const ModalCalendar = ({
  inputValue, setInputValue,
  startDate, setStartDate,
  endDate, setEndDate,
  selectedColor, setSelectedColor,
  textAreaValue, setTextAreaValue,
}) => {
  return (
    <List>
      <dt>
        <label htmlFor="title">제목</label>
      </dt>
      <dd>
        <Input
          id="title"
          placeholder="제목을 입력해 주세요."
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}
        />
      </dd>
      <dt>
        <label htmlFor="start-date">시작일</label>
      </dt>
      <dd>
        <DatePicker
          id="start-date"
          type="date"
          value={startDate}
          onChange={setStartDate}
        />
      </dd>
      <dt>
        <label htmlFor="end-date">종료일</label>
      </dt>
      <dd>
        <DatePicker
          id="end-date"
          type="date"
          value={endDate}
          onChange={setEndDate}
        />
      </dd>
      <dt>
        <label>라벨</label>
      </dt>
      <dd>
        <LabelList>
          {["orange", "regular", "red", "green", "blue"].map((color) => (
            <li key={color}>
              <LabelColor
                color={color}
                selectedColor={selectedColor}
                onSelect={setSelectedColor}
              />
            </li>
          ))}
        </LabelList>
      </dd>
      <dt>
        <label htmlFor="contents">내용</label>
      </dt>
      <dd>
        <TextArea
          id="contents"
          disabled={false}
          placeholder="내용을 입력해 주세요."
          value={textAreaValue}
          onChange={(e) => {setTextAreaValue(e.target.value)}}
        />
      </dd>
    </List>
  )
}

export default ModalCalendar