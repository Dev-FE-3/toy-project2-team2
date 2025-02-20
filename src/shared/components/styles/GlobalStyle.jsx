import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import './fonts.css'

const GlobalStyle = createGlobalStyle`
	:root {
		/* primary */
		--primary: #00ADB5;
		--accent: #63C5CA;

		/* background-color */
		--background-color: #EEE;
		--disabled: #D9D9D9;

		/* text-color */
		--text-primary: #1E2A2E;
		--text-sencondary: #4A4A4A;
		--text-disabled: #828282;

		/* font-size */
		--font-size-title-large: 32px;
		--font-size-title-medium: 24px;
		--font-size-title-small: 18px;
		--font-size-primary: 16px;
		--font-size-samll: 14px;
	}

	// reset css
	${reset}

	button {
    border: none;
    cursor: pointer;
  }

	a {
    text-decoration: none;
		color: var(--text-disabled);
  }

	body {
		font-family: 'Noto Sans KR', sans-serif;
	}
`

export default GlobalStyle