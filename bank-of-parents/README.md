# 엄마 아빠, 집 사고 싶어요. 대출해 주세요 — 비주얼뉴스

## 구성

- `index.html`, `styles-editorial.css`, `story.js`: 본문. Vanilla JavaScript, 외부 라이브러리 없음.
- `assets/subway-wide.webp`, `subway-mobile.webp`: 별도 PC·모바일 연출 이미지.
- `assets/contract-scene.webp`, `bank-desk.webp`, `funding-source.webp`: 제공된 아시아경제 이미지.
- `assets/family-table.webp`: 가족 간 자금 마련을 표현한 AI 생성 연출 이미지.
- `iframe-test.html`: 실제 기사 본문 폭을 가정한 iframe 삽입 테스트 페이지.

제목과 큰 숫자는 네이버의 무료 공개 글꼴 **마루 부리** Light·Regular·SemiBold를 로컬 WOFF2로 제공합니다. 본문과 자료 표기는 OS 기본 고딕체를 사용합니다. 서체 출처·이용 조건: [네이버 한글한글아름답게](https://hangeul.naver.com/font). 글꼴 파일은 [MaruBuri 웹폰트 배포본](https://github.com/fonts-archive/MaruBuri)에서 받았습니다. 외부 라이브러리는 없습니다. 원본 그래픽을 펼쳐서 볼 수 있고, JavaScript가 없어도 기사 문장과 수치가 보입니다.

## GitHub Pages

현재 `kiminuki0301-hub/charye-visual-2026` 저장소의 `bank-of-parents/` 폴더에서 GitHub Pages로 배포합니다. 기존 차례상 프로젝트의 루트 파일은 유지합니다. 기사입력기 코드는 실제 기사입력기의 스크립트 허용 범위를 확인한 뒤 확정합니다.

## iframe 높이

자식 문서는 `bank-of-parents-height` 메시지로 콘텐츠 높이를 부모에게 보냅니다. `iframe-test.html`은 이벤트 발신 창과 origin을 확인하고 높이를 갱신합니다. 기사입력기가 `<script>`를 제거하면 자동 높이가 작동하지 않으므로, 해당 시스템의 삽입 방식에 맞춘 별도 처리가 필요합니다. 고정 `100vh` iframe에 내부 스크롤을 켜는 방식은 사용하지 않습니다.

## 자료와 해석

- 2026년 1~7월 계약 기준 국토교통부 자료를 김종양 의원실이 분석한 기사 2건.
- 자금 구성의 22.8%는 **금액 비중**, 사적 차입 44.0%와 증여·상속 48.4%는 **계획서 기재율**입니다. 합산하지 않습니다.
- 지하철·가족 대화 이미지는 실제 취재 사진이 아닌 연출 이미지입니다.
- 제공 사진의 확인되지 않은 촬영 기자명은 넣지 않았습니다. 원본 자금 구성 그래픽을 펼쳐 보여주는 곳에만 이영우 아시아경제 크레딧을 표시했습니다.

## 화면 QA

배포된 `qa-width.html`의 iframe 폭을 320, 375, 390, 430, 768, 1024, 1440, 1920px로 바꿔 렌더링했다. 각 폭에서 문서 `scrollWidth`가 viewport 폭을 넘지 않았고 제목·주요 수치 요소의 내부 가로 넘침도 없었다. 320px와 375px의 첫 장면, 1363px의 문장·가격·자금 장면을 육안으로 확인했다. 1363px 기사 폭 가정 `iframe-test.html`에서 `postMessage`를 받아 iframe 높이가 콘텐츠 높이로 조정되는 것도 확인했다. 실제 아시아경제 기사입력기에서 `<script>` 허용 여부와 모바일 기기별 체감은 별도로 확인해야 한다.
