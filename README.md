# 복지 혜택 추천 서비스 '소복소복'

### 📌 프로젝트 개요

- 개발 기간: 2022.02.28 ~ 2022.04.08 (6주)
- 기획의도 및 내용
  - 복지 혜택이 많아지지만, 어떤 혜택 또는 어떻게 혜택을 받을 수 있는지에 대한 정보가 부족하다고 느껴 혜택 받을 수 있는 복지 서비스를 추천해주는 서비스를 기획
  - 연령대, 가구상황 등의 조건을 입력하면 사용자 맞춤 복지 혜택 정보를 제공
  - 추천받은 복지와 유사한 다른 복지, 현재 인기있는 복지 혜택을 제공

### 📌 팀원 및 역할 분담

- 팀 구성: Frontend 3명, Backend 3명
- 주 역할: Frontend 개발

### 📌 개발 내용

- 메인 페이지
    - 인기 검색어 (1~10위) 및 검색바 컴포넌트 구현
    - 사용자 맞춤 복지와 인기순 복지를 탭 컴포넌트로 구현
- 로그인
    - 카카오 로그인 API를 이용한 소셜 로그인 구현
    - 카카오 기본 정보를 받아와 사용자 조건으로 활용
- 내 정보 페이지
    - 맞춤 복지 혜택 제공에 필요한 정보 입력 폼 구현
    - 찜한 복지, 사용한 복지 List-up 컴포넌트 구현

### 📌 향상된 역량

- React를 활용한 Single Page Application(SPA) 개발 능력 향상
- React 함수형 컴포넌트, Hooks 조합으로 구현하여 함수형 프로그래밍에 대해 학습
- styled-components를 이용한 CSS-in-JS 스타일링 구현 능력 습득
- Axios를 활용하여 REST API 데이터 통신 연결 능력 습득


-------------
### 🛠 기술 스택
<details markdown="1">
<summary>Back-end</summary>

- Django
- SpringBoot
- JAVA

</details>

<details markdown="1">
<summary>Front-end</summary>

- React
- JavaScript
- HTML5
- CSS3
- styled-components
- MUI

</details>

<details markdown="1">
<summary>DB</summary>

- MySQL

</details>

<details markdown="1">
<summary>Tool</summary>

- GitLab
- Docker
- JIRA
- Notion
- MatterMost

</details>


### 🎇 주요 기능

|페이지|내용|
|--|--|
|홈|인기검색어 기능, 로그인 전·후 탭 내용 <br> 검색창에 검색어 입력 시, 검색페이지로 이동되어 검색결과 나타남|
|복지 검색|인기검색어 실시간 반영, 검색 결과 데이터 페이지네이션 구현 <br> 해당 복지 클릭 시, 해당 복지 상세페이지로 이동|
|추천서비스|원 그래프로 유저가 지원받을 수 있는 유형 표시 <br> 선 그래프로 유저와 비슷한 다른 유저들의 조회순으로 나타낸 인기 복지들 표시 <br> 추천 알고리즘으로 유저에게 맞춤 추천된 복지들을 카드 슬라이드로 구현 <br> 인기 복지를 카드 슬라이드로 구현 <br> 해당 복지 클릭 시, 상세 페이지로 이동|
|복지 상세보기|해당 복지의 상세정보 표시 <br> 해당 복지와 유사도가 높은 복지를 랜덤으로 3개씩 추천 <br> 찜하기, 사용 중 기능으로 아이콘 클릭마다 alert |
|고객센터|게시글, 댓글 CRUD 구현 <br> 고객의 복지 혜책 추가 및 사이트 이용 문의 기능|
|이용안내|소복소복 홈페이지 이용 가이드 안내|
|내 정보|맞춤 필터로 유저의 가구 특성, 대상 특성, 연령대 등을 입력·저장 <br> 찜한 복지, 사용 중인 복지 리스트업 및 페이지네이션 기능 <br> 카카오 소셜 로그인 |

### 💻 실행 방법
<strong>Client 실행</strong>
  1. 원격 저장소 복제
```
$ git clone https://github.com/hyunjung0409/SobokSobok.git
```
  2. 프로젝트 폴더로 이동 후 frontend 폴더로 이동
```
$ cd frontend
```
  3. 필요한 node_modules 설치
```
$ yarn install
```
  4. 리액트 앱 실행
```
$ yarn start
```
