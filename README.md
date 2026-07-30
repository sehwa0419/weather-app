# 🌤️ Weather App

Next.js 기반으로 개발한 도시별 날씨 조회 웹 애플리케이션입니다.

Open-Meteo API를 활용하여 현재 날씨와 7일 예보를 확인할 수 있으며,
즐겨찾기 기능을 통해 원하는 도시를 편리하게 관리할 수 있습니다.

## 🔗 배포 주소

**Live Demo**

[https://weather-app-pi-eight-43.vercel.app](https://weather-app-pi-eight-43.vercel.app/)

---

## ✨ 주요 기능

- 도시별 현재 날씨 조회
- 7일간의 날씨 예보
- 즐겨찾기 등록 및 상단 정렬
- 최신 날씨 다시 불러오기
- 반응형 웹 지원
- Loading 및 404 페이지 제공

---

## 🛠 기술 스택

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### API

- Open-Meteo API

### Deployment

- Vercel

### Version Control

- Git
- GitHub

---

## 실행 방법

### 프로젝트 설치

```bash
git clone https://github.com/sehwa0419/weather-app.git

cd weather-app

npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```
http://localhost:3000
```

---

## 📂 폴더 구조 및 설계 의도

```text
app/
├── city/[id]        # 도시 상세 페이지
├── loading.tsx      # 로딩 화면
├── not-found.tsx    # 404 페이지
├── page.tsx         # 메인 페이지

components/
├── CityCard.tsx
├── CityList.tsx
└── RefreshButton.tsx

services/
└── weather.ts       # Open-Meteo API 호출

data/
└── cities.ts        # 도시 정보 관리

types/
└── weather.ts       # 타입 정의

utils/
└── weatherCode.ts   # 날씨 코드 변환
```

### 설계 의도

- **components** : UI를 재사용 가능한 컴포넌트 단위로 분리
- **services** : API 요청 로직을 별도로 관리하여 유지보수 용이
- **data** : 도시 정보를 별도 파일에서 관리하여 확장성 확보
- **types** : TypeScript 타입을 한곳에서 관리
- **utils** : 날씨 코드 변환 등 공통 기능 분리
- **app** : App Router 기반 페이지 구성

---

## 추가 기능

- Open-Meteo API를 이용한 현재 날씨 조회
- localStorage를 활용한 즐겨찾기 기능
- 즐겨찾기한 도시 상단 고정
- 최신 날씨 다시 불러오기
- 모바일 환경을 고려한 반응형 UI
- Loading 및 Not Found 페이지 구현

---

## AI 사용 여부

프로젝트 개발 과정에서 ChatGPT를 활용하였습니다.

활용 내용
- Next.js App Router 구조 학습
- Open-Meteo API 연동 방식 검토
- 기능 구현 아이디어 및 코드 리뷰
- 오류 원인 분석 및 리팩토링

최종 구현 및 수정은 직접 수행하였습니다.

---

## 📸 Preview

### Desktop

#### Main Page

<img width="962" height="510" alt="image" src="https://github.com/user-attachments/assets/88cdbb8b-13e3-4ce9-a9b0-dabf9cb81020" />

#### Detail Page

<img width="850" height="803" alt="image" src="https://github.com/user-attachments/assets/3933f160-0f4f-4435-b8cc-6bf0d9d87ce4" />

### Mobile

<table align="left">
  <tr>
    <th>Main Page</th>
    <th>Detail Page</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/e046e735-ab57-49ff-b6a5-6c355f74f3f5" width="280"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/130170cf-a2ed-4954-bb75-45708476a088" width="280"/>
    </td>
  </tr>
</table>
