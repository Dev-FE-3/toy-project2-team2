import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./fonts.css";

const GlobalStyle = createGlobalStyle`
	:root {
		/* primary */
		--primary: #00ADB5;
		--primary-dark: #00868D;
		--accent: #63C5CA;

		/* disabled */
		--disabled: #D9D9D9;

		/* color */
		--white: #FFFFFF;
		--red: #E05230;
		--red-bg: #FFEBEB;
		--green: #4CAF50;
		--green-bg: #E5F8EB;
		--blue: #0085FF;
		--blue-bg: #E5F3FF;
		--orange: #FF9F2D;
		--orange-bg: #FFF4E8;
		--regular: #585757;
		--regular-bg: #E8E8E8;

		/* background-color */
		--background-color: #EEEEEE;
		--background-color-2: #EEFFFE;
		--background-color-3: #F9F9F9;

		/* text-color */
		--text-primary: #1E2A2E;
		--text-secondary: #4A4A4A;
		--text-disabled: #828282;
		--text-disabled-2: #CACACA;

		/* font-size */
		--font-size-title-large: 32px;
		--font-size-title-medium: 24px;
		--font-size-title-small: 18px;
		--font-size-primary: 16px;
		--font-size-small: 14px;
	}

	// reset css
	${reset}

	button {
    border: none;
    cursor: pointer;
		font-family: inherit;
  }

	a {
    text-decoration: none;
		color: var(--text-disabled);
  }

	body {
		font-family: 'Noto Sans KR', sans-serif;
  }

	input {
    all: unset; // 기본 스타일 제거
    box-sizing: border-box;
  }
	
  textarea {
		all:unset;
	}

	&::-webkit-scrollbar {
    width: 8px;
  }	
  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb, var(--text-disabled-2));
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--scrollbar-track, var(--background-color));
		border-radius: 8px;
  }
`;

export default GlobalStyle;
