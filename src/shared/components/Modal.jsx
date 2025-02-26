import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  background: var(--white);
  font-family: Noto Sans KR;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  width: 400px;
  height: 598px;
  border-radius: 10px;
  border: 1px solid var(--disabled);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 28px;
  gap: 32px;
  box-sizing: border-box;
`;

const ModalHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContent = styled.div`
  flex-grow: 1;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 412px;
  width: 344px;
`;
const Label = styled.label`
  color: var(--text-disabled);
`;

const ModalFooter = styled.div`
  display: flex;
  height: 35px;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 30px; /* 라벨과 인풋 간격 조정 */
`;

const Modal = ({ type, onClose }) => {
  let title = "";
  let content = "";
  let hasSubmitButton = false;

  switch (type) {
    case "request":
      title = "정정 신청";
      hasSubmitButton = true;
      content = (
        <>
          <FormGroup>
            <Label>정정 대상</Label>
            <input type="text" placeholder="정정 대상 입력" />
          </FormGroup>
          <FormGroup>
            <Label>정정 유형</Label>
            <select>
              <option>유형 선택</option>
              <option>유형 1</option>
              <option>유형 2</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label>정정 사유</Label>
            <textarea placeholder="내용 입력"></textarea>
          </FormGroup>
        </>
      );
      break;
    case "history":
      title = "정정 내역";
      content = (
        <>
          <FormGroup>
            <Label>정정 대상</Label>
            <input type="text" value="유급 휴가" readOnly />
          </FormGroup>
          <FormGroup>
            <Label>정정 유형</Label>
            <input type="text" value="2025 / 02" readOnly />
          </FormGroup>
          <FormGroup>
            <Label>정정 사유</Label>
            <textarea readOnly>
              유급 휴가가 반영되지 않았습니다. 정정 부탁드립니다.
            </textarea>
          </FormGroup>
        </>
      );
      break;
    case "schedule":
      title = "일정 등록";
      hasSubmitButton = true;
      content = (
        <>
          <FormGroup>
            <Label>제목</Label>
            <input type="text" placeholder="제목 입력" />
          </FormGroup>
          <FormGroup>
            <Label>시작일</Label>
            <input type="date" />
          </FormGroup>
          <FormGroup>
            <Label>종료일</Label>
            <input type="date" />
          </FormGroup>
          <FormGroup>
            <Label>라벨</Label>
            <div>
              <span
                style={{
                  backgroundColor: "orange",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              ></span>
              <span
                style={{
                  backgroundColor: "red",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              ></span>
              <span
                style={{
                  backgroundColor: "green",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              ></span>
              <span
                style={{
                  backgroundColor: "blue",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              ></span>
            </div>
          </FormGroup>
          <FormGroup>
            <Label>내용</Label>
            <textarea placeholder="내용 입력"></textarea>
          </FormGroup>
        </>
      );
      break;
    case "check-schedule":
      title = "일정 확인";
      content = (
        <>
          <FormGroup>
            <Label>제목</Label>
            <input type="text" value="휴가" readOnly />
          </FormGroup>
          <FormGroup>
            <Label>시작일</Label>
            <input type="text" value="2025 / 02 / 20" readOnly />
          </FormGroup>
          <FormGroup>
            <Label>종료일</Label>
            <input type="text" value="2025 / 02 / 21" readOnly />
          </FormGroup>
          <FormGroup>
            <Label>라벨</Label>
            <div>
              <span
                style={{
                  backgroundColor: "red",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              ></span>
            </div>
          </FormGroup>
          <FormGroup>
            <Label>내용</Label>
            <textarea readOnly>가족 여행 계획이 있습니다.</textarea>
          </FormGroup>
        </>
      );
      break;
    default:
      title = "알 수 없는 모달";
      content = <p>잘못된 접근입니다.</p>;
  }

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          {title}
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ModalContent>{content}</ModalContent>
        <ModalFooter>
          <button onClick={onClose}>닫기</button>
          {hasSubmitButton && <button>등록하기</button>}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
