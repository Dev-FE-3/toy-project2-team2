import styled from "styled-components";
import Input from "../../../shared/components/Input";
import TextArea from "../../../shared/components/TextArea";
import DatePicker from "../../../shared/components/DatePicker";
import LabelColor from "./LabelColor";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  & > li {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    align-items: center;

    &.textarea {
      width: 100%;

      & > div {
        width: 100%;
      }
    }

    & > label {
      min-width: 45px;
      color: var(--text-disabled);
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
      <li>
        <Input
          id="title"
          label="제목"
          placeholder="제목을 입력해 주세요."
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}
        />
      </li>
      <li>
        <label htmlFor="start-date">시작일</label>
        <DatePicker
          id="start-date"
          type="date"
          value={startDate}
          onChange={setStartDate}
        />
      </li>
      <li>
        <label htmlFor="end-date">종료일</label>
        <DatePicker
          id="end-date"
          type="date"
          value={endDate}
          onChange={setEndDate}
        />
      </li>
      <li>
        <label>라벨</label>
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
      </li>
      <li className="textarea">
        <TextArea
          id="contents"
          label="내용"
          rows="4"
          disabled={false}
          placeholder="내용을 입력해 주세요."
          value={textAreaValue}
          onChange={(e) => {setTextAreaValue(e.target.value)}}
        />
      </li>
    </List>
  )
}

export default ModalCalendar