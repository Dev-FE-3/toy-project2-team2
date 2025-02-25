import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "no-unused-vars": "off", // 사용하지 않는 변수 경고 끄기
      "react/prop-types": "off", // PropTypes 검사 비활성화
      "react/jsx-no-target-blank": "warn", // 보안 관련 경고만
      "react-refresh/only-export-components": "warn", // HMR 관련
      "react-hooks/rules-of-hooks": "error", // hooks 규칙은 강제
      "react-hooks/exhaustive-deps": "warn", // useEffect 의존성 경고만
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];
