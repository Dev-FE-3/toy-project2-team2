## ✨ 프로젝트 소개

![image](https://github.com/user-attachments/assets/bb29e9ce-b0d6-4d50-af21-651233385d48)

> **직원들의 개인 일정 관리와 급여 확인 및 급여 정정을 효율적으로 관리하는 스마트 시스템!** <br />

Sweet Ten은 H&B 브랜드의 급여 관리 시스템으로, 직무 수행을 위한 일정정 관리 뿐만 아니라 지급 내역과 정정 신청을 체계적으로 관리할 수 있는 웹 애플리케이션입니다.
직급별로 사용해야 하는 기능이 다르다는 점을 주목해 직급별 맞춤 기능을 제안합니다.
<br/>

본 프로젝트는 React.js와 Firebase를 기반으로 개발되었으며, Redux를 활용하여 로그인한 유저의 상태를 효율적으로 관리하였습니다.

> [▶︎&nbsp;&nbsp;토이프로젝트 2 - 배포 사이트 바로가기&nbsp; 👀](https://toyproject2-baa7f.web.app/)

&nbsp;

## 🤓 팀 - 후크선장

<div align="center">
   
| <img width="200px" src="https://avatars.githubusercontent.com/u/113437204?v=4" style="max-width: 100%;"> | <img width="200px" src="https://avatars.githubusercontent.com/u/38741900?v=4" style="max-width: 100%;"> | <img width="200px" src="https://avatars.githubusercontent.com/u/148299246?v=4" style="max-width: 100%;"> | <img width="200px" src="https://avatars.githubusercontent.com/u/94222592?v=4" style="max-width: 100%;"> |
| :---: | :---: | :---: | :---: |
| **[안요셉](https://github.com/YosepAhn)** | **[박현아](https://github.com/pha1155)** | **[조유나](https://github.com/j0n0m2)** | **[정지윤](https://github.com/jiyoon04)** |
| 정정 신청 / 내역 (직원) <br/> 공통 컴포넌트 <br/> Toast 알림 <br/> README | 내 일정 (캘린더) <br/> Layout & Header <br/> CSS & 공통 컴포넌트  | 로그인 & 회원가입 <br/> 정정 신청 / 내역 (매니저)<br/> 디자인 <br/> Routing | 급여확인 (직원 & 매니저)<br/> 직원 리스팅 (매니저) <br/> 공통 컴포넌트  <br/> 프로필 이미지 업로드<br/> Routing & Redux |
</div>

&nbsp;

## 🚀 페이지 소개 및 주요 기능

### 1. 로그인 / 회원가입 (Auth)

- Firebase Authentication을 활용한 회원가입 및 로그인 기능
- 이메일/비밀번호 로그인 방식
- 사용자 데이터를 Firestore에 저장
- Redux Store를 활용한 상태 관리

![Image](https://github.com/user-attachments/assets/6422e99e-119e-4bfa-98d1-012caee8a1de)

> Error 확인 후 로그인 성공 시 환영 Toast 확인

![Image](https://github.com/user-attachments/assets/f333bce0-f76f-4ca5-bef9-81098a1c9828)

> 정상적으로 가입 후 Toast & Header 프로필 업로드

&nbsp;

### 2. 내 일정 (Calendar)

- 달력 생성과 일정 부분을 useCalendar, useSchedules 커스텀 Hook을 이용하여 렌더링
- useModal 커스텀 Hook을 활용하여 모달 구현
- 일정 추가, 조회, 수정, 삭제(CRUD) 기능 구현
- 로그인한 직원의 일정 Firestore DB 연동
- 라벨 색상으로 일정 구분 표시

![Image](https://github.com/user-attachments/assets/33519c4e-a4dc-40cc-9cb4-c9e872d7b4e6)

> 제목 Toast 확인 일정 등록, 등록된 일정 클릭 하여 확인, 수정, 삭제

&nbsp;

### 3. 급여 확인 (Salary)

- 로그인한 직원의 급여 정보를 Firestore에서 불러와 useSalaryData(userId, selectedMonth) Hook으로 렌더링
- useAvailableMonths(userId)로 13개월 이상 근속 시 최근 12개월의 급여 정보만 제공
- Redux Store를 활용하여 개인 정보를 유지하고, 필요 시 Firestore에서 재조회

![Image](https://github.com/user-attachments/assets/d56465d9-bf4c-472f-8a2b-02a8ff2cbdd9)

> 월 별 Select Box 선택

&nbsp;

### 4. 정정 신청 / 내역 (Salary Adjustment)

- useModal 커스텀 Hook을 활용한 모달 창 구현
- 로그인한 사용자가 급여 정정 신청 가능
- 자신의 정정 내역을 Firestore에서 조회 가능
- 신청 내역을 Firebase Firestore에 저장 및 관리

![Image](https://github.com/user-attachments/assets/f572ba54-6194-4ddc-a925-529939bbe3d5)

> 정정 신청 등록, Toast 확인, 등록된 정정 내역 클릭하여 상세 내용 확인

&nbsp;

### 5. 급여 확인 (직원 리스트) - Manager

- 매니저가 모든 직원에 대한 정보를 리스팅 페이지를 통해 접근
- 사번과 이름으로 검색이 가능하고 입력 시 뜨는 Icon을 통해 검색 내역 초기화 가능

![Image](https://github.com/user-attachments/assets/d5b19dce-4ab3-4bc1-bdf9-ebb88cc2192d)

> 이름 / 사번으로 검색, Icon 클릭 - 검색 상태 새로고침, 리스팅 항목 클릭 후 페이지 이동

&nbsp;

### 6. 급여 관리 - Manager

- 선택한 직원의 급여 정보를 useAvailableMonths(employeeId)와 useSalaryData(employeeId, selectedMonth) Hook을 통해 달 별로 확인
- 지급 내역 수정이 있는 경우 4대 보험 & 실 지급액이 useRecalculateDeductions(payments) Hook을 통해 재계산되어 Firestore에 업데이트

![Image](https://github.com/user-attachments/assets/02e2e04f-8a6b-411d-8914-eaf7f7498195)

> 월 선택 후 급여 수정, 저장 후 업데이트 확인

&nbsp;

### 7. 정정 신청 / 내역 관리 - Manager

- useModal 커스텀 Hook을 활용하여 모달 구현
- 모든 직원의 정정 신청 내역 열람 가능
- 정정 신청 처리 상태를 기준으로 내역 필터링 조회 가능
- 모든 직원의 정정 신청 승인 및 반려 기능 구현
- 수정된 정정 신청 정보를 기반으로 Firestore 해당 문서 업데이트

![Image](https://github.com/user-attachments/assets/a342c47c-e454-4431-88f0-8706db1189ef)

> 정정 상태에 대한 필터링 적용, 정정 상태 수정 후 제출하면 firebase 업데이트

&nbsp;

## 🔨 기술 스택

<div >
<h3>Frontend</h3>
<div align="left">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
</div>

<h3>Backend</h3>
<div align="left">
<img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=Firebase&logoColor=white">  
</div>

<h3> Tools</h2>
<div align="left">
 <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
   <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
   <img src="https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=Zoom&logoColor=white">
   <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
   <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
</div>
</div>

&nbsp;

## 🧱 폴더 구조

```
💚src
 ┣ 📚pages
 ┃ ┣ 🔒auth
 ┃ ┣ 📁calendar
 ┃ ┣ 📁employeeList
 ┃ ┣ 📁salary
 ┃ ┗ 📁salaryAdjustment
 ┣ 📓shared
 ┃ ┣ ⭐️components
 ┃ ┣ 💄styles
 ┃ ┣ 📁config
 ┃ ┣ 📁header
 ┃ ┣ 📄firebase.js
 ┃ ┗ 📄Layout.jsx
 ┣ 🧰store
 ┣ 📄App.jsx
 ┗ 📄main.jsx

```

&nbsp;

## ⏰ 프로젝트 일정

![image](https://github.com/user-attachments/assets/5afcd389-a246-45aa-bda6-6168ae11cd75)

> 개발 2025년 2월 17일 ~ 2025년 3월 14일 / 리팩토링 ~ 2025년 3월 19일

&nbsp;

## 🎮 프로젝트 실행 방법

1. `.env` 파일 설정: API 키를 안전하게 보관하기 위해 `.env` 파일을 생성하고, 필요한 환경 변수를 설정합니다.
2. 프로젝트 클론:

   `git clone https://github.com/Dev-FE-3/toy-project2-team2.git`

3. 패키지 설치:

   `npm install`

4. 프로젝트 실행:

   `npm run dev `

&nbsp;

## ⚡ 브랜치 전략

### 1. 브랜치 종류

| 브랜치명           | 설명                                   |
| ------------------ | -------------------------------------- |
| `main`             | 제품의 안정적인 배포를 위한 브랜치     |
| `dev`              | 개발 브랜치로, 모든 기능이 병합되는 곳 |
| `feature/[기능명]` | 기능 개발을 위한 개별 브랜치           |

### 2. 브랜치 흐름

| 대상 브랜치                | Merge 방식                          |
| -------------------------- | ----------------------------------- |
| `feature/[기능명]` → `dev` | **Squash Merge** (커밋 내역 정리)   |
| `dev` → `main`             | **Merge** (Squash 적용된 내용 유지) |

### 3. 브랜치 운영 방식

1. **기능 개발**: `feature/[기능명]`에서 작업 후 `dev` 브랜치로 `Squash Merge`
2. **개발 완료 후 배포**: `dev`에서 안정적인 상태가 되면 `main`으로 `Merge`
3. **Squash Merge 적용 이유**: 기능 단위로 커밋을 정리하여 `dev` 브랜치를 깔끔하게 유지

&nbsp;

## 🤙 커밋 컨벤션

```jsx
# 제목은 최대 50글자까지 아래에 작성: ex) Feat: Add Key mapping

# 본문은 아래에 작성

# 꼬릿말은 아래에 작성: ex) Github issue #23

# --- COMMIT END ---
#   <타입> 리스트
#   Feat        : 기능 (새로운 기능)
#   Fix         : 버그 (버그 수정)
#   Refactor    : 리팩토링
#   Design      : CSS 등 사용자 UI 디자인 변경
#   Comment     : 필요한 주석 추가 및 변경
#   Style       : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
#   Docs        : 문서 수정 (문서 추가, 수정, 삭제, README)
#   Test        : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   Chore       : 기타 변경사항 (빌드 스크립트 수정, assets, 패키지 매니저 등)
#   Init        : 초기 생성
#   Rename      : 파일 혹은 폴더명을 수정하거나 옮기는 작업만 한 경우
#   Remove      : 파일을 삭제하는 작업만 수행한 경우
# ------------------
#   제목 첫 글자를 대문자로
#   제목은 명령문으로
#   제목 끝에 마침표(.) 금지
#   제목과 본문을 한 줄 띄워 분리하기
#   본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
#   본문에 여러줄의 메시지를 작성할 땐 "-"로 구분
# ------------------
#   <꼬리말>
#   필수가 아닌 optioanl
#   Fixes        :이슈 수정중 (아직 해결되지 않은 경우)
#   Resolves     : 이슈 해결했을 때 사용
#   Ref          : 참고할 이슈가 있을 때 사용
#   Related to   : 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)
#   ex) Fixes: #47 Related to: #32, #21

```

&nbsp;

## 🤙 네이밍 컨벤션

```
- 변수: camelCase
- 상수: SNAKE_CASE (대문자)
- 함수: camelCase, 동사로 시작 ex) onClick
- 컴포넌트: arrow function
- 포멧터: Prettier / ESLint (w. Airbnb style guide)

```

&nbsp;

## 📘 문서 템플릿

```markdown
### 📄 Describe

설명을 적어요.

### ✅ Tasks

- [ ] 투두리스트를 적어요.

### 📋 Ref

추가적인 정보나 참고 문서를 적어요.
```

```markdown
✨ Related Issues

- 이슈 넘버 #[issue_number]

## 📝 Task Details

- 이 곳에 진행한 업무를 작성해주세요!

## 📂 References

- 스크린샷이나 레퍼런스를 넣어주세요!

## 💖 Review Requirements

- 리뷰 요구사항을 적어주세요!
```
