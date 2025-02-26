import Button from "../../shared/components/button/Button";
import TextBox from "../../shared/components/TextBoxWrapper";
import styled from "styled-components";
import Input from "./../../shared/components/input/Input";
import LoginInput from "./../../shared/components/input/LoginInput";

const Wrapper = styled.div`
  width: 150px;
  height: 150px;
`;

const Guide = () => {
  return (
    <>
      <h1>page title</h1>
      <PageTitle title="페이지명1" />
      <PageTitle title="페이지명2" subtitle="페이지 설명"/>

      <h1>button</h1>
      <Button size="sm">작은 버튼</Button>
      <Button size="sm" color="gray">
        작은 버튼
      </Button>
      <Button>기본 버튼</Button>
      <Button color="gray">기본 버튼</Button>
      <Button size="lg">큰 버튼</Button>
      <Button size="lg" color="gray">큰 버튼</Button>
      <h1>page title</h1>
      <h1>input</h1>
      

      <h1>input</h1>
      <Input/>
      <Input disabled placeholder="disabled input 입니다"/>
      <LoginInput placeholder="login input 입니다"/>
      <LoginInput type="email" placeholder="email"/>
      <LoginInput type="password" placeholder="password"/>

      <h1>textarea</h1>
      <Wrapper>
        <TextBox
          disabled={false}
          placeholder="임의로 임력하면 됩니다 wrapper가 있는 이유는 사이즈가 100%여서.."
        />
      </Wrapper>
      <br />
      <h1>modal</h1>
      <h1>select box</h1>
      <h1>date</h1>
    </>
  );
};

export default Guide

