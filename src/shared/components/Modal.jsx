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
  background: white;
  width: 400px;
  height: 598px;
  border-radius: 10px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 28px;
`;

const ModalHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const ModalContent = styled.div`
  flex-grow: 1;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Modal = ({ type, onClose }) => {
  let title = "";
  let content = "";

  switch (type) {
    case "request":
      title = "정정 신청";
      content = (
        <>
          <label>정정 대상</label>
          <input type="text" placeholder="정정 대상 입력" />
          <label>정정 유형</label>
          <select>
            <option>유형 선택</option>
            <option>유형 1</option>
            <option>유형 2</option>
          </select>
          <label>정정 사유</label>
          <textarea placeholder="내용 입력"></textarea>
        </>
      );
      break;
    case "history":
      title = "정정 내역";
      content = (
        <>
          <label>정정 대상</label>
          <input type="text" value="유급 휴가" readOnly />
          <label>정정 유형</label>
          <input type="text" value="2025 / 02" readOnly />
          <label>정정 사유</label>
          <textarea readOnly>
            유급 휴가가 반영되지 않았습니다. 정정 부탁드립니다.
          </textarea>
        </>
      );
      break;
    case "schedule":
      title = "일정 등록";
      content = (
        <>
          <label>제목</label>
          <input type="text" placeholder="제목 입력" />
          <label>시작일</label>
          <input type="date" />
          <label>종료일</label>
          <input type="date" />
          <label>라벨</label>
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
          <label>내용</label>
          <textarea placeholder="내용 입력"></textarea>
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
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
