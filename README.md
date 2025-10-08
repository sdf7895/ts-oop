# 🎮 TypeScript Playground

TypeScript 학습 및 실험을 위한 플레이그라운드입니다.

---

## 📚 프로젝트 목록

### 01. 객체지향 프로그래밍 (OOP)
**티켓 예약 시스템을 통한 OOP 학습**

- 📂 경로: [`src/01/`](./src/ticket/)
- 📖 상세 문서: [`src/01/README.md`](./src/ticket/README.md)
- 🎯 학습 내용:
  - SOLID 원칙 실전 적용
  - 디자인 패턴 (Strategy, Facade, DTO)
  - 인터페이스와 추상 클래스 활용
  - 컴포지션 패턴

```bash
# 실행 방법
npm run dev src/01/composition_interface_ticket.ts
```

---

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 모드 (Watch)
```bash
npm run dev src/파일경로.ts
```

### 빌드
```bash
npm run build
```

---

## 📁 프로젝트 구조

```
ts-playground/
├── src/
│   ├── 01/                    # OOP 학습 프로젝트
│   │   ├── composition_ticket.ts
│   │   ├── composition_interface_ticket.ts
│   │   ├── discount_policy.ts
│   │   └── README.md         ⭐ 상세 문서
│   │
│   ├── index.ts              # 기본 예제
│   ├── test.ts               # 테스트 파일
│   └── example.ts            # 예제 파일
│
├── package.json
├── tsconfig.json
└── README.md                 📍 현재 파일
```

---

## 🛠️ 기술 스택

- **TypeScript** - 타입 안정성
- **tsx** - 빠른 TypeScript 실행
- **nodemon** - 파일 변경 감지 및 자동 재실행

---

## 📖 학습 가이드

### 1️⃣ 객체지향 프로그래밍 (OOP)
👉 **[src/01/README.md](./src/01/README.md)** 에서 확인하세요!

- SOLID 원칙이 실제 코드에서 어떻게 적용되는지
- 각 디자인 패턴의 장단점
- 클래스 간 의사소통 방법
- Mermaid 다이어그램으로 구조 시각화

---

## 💡 사용 예시

### 파일별 실행
```bash
# 기본 예제
npm run dev src/index.ts

# 테스트 파일
npm run dev src/test.ts

# OOP 티켓 시스템
npm run dev src/01/composition_interface_ticket.ts

# 할인 정책만 테스트
npm run dev src/01/discount_policy.ts
```

### 새 파일 만들기
```typescript
// src/my-practice.ts
export {};

console.log("Hello TypeScript!");

// 실행
npm run dev src/my-practice.ts
```

---

## 🔍 각 프로젝트 상세보기

| 폴더 | 주제 | 상세 문서 | 주요 학습 내용 |
|------|------|-----------|----------------|
| [`src/01/`](./src/01/) | OOP 기초 | [📖 README](./src/01/README.md) | SOLID, 디자인 패턴, 인터페이스 |
| `src/02/` | 🚧 준비중 | - | - |
| `src/03/` | 🚧 준비중 | - | - |

---

## 📝 노트

### TypeScript 모듈 시스템
- 각 파일은 `export {};`로 시작하여 독립적인 모듈로 동작
- 같은 이름의 클래스를 다른 파일에서 사용해도 충돌 없음

### Watch 모드
- 파일 변경 시 자동으로 재실행
- `Ctrl+C`로 종료

---

## 🎯 학습 목표

- ✅ TypeScript 타입 시스템 이해
- ✅ 객체지향 프로그래밍 원칙 습득
- ✅ 디자인 패턴 실전 적용
- ✅ 클린 코드 작성 연습
- ⬜ 함수형 프로그래밍 (예정)
- ⬜ 비동기 프로그래밍 (예정)

---

## 📚 참고 자료

- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [SOLID 원칙](https://en.wikipedia.org/wiki/SOLID)
- [디자인 패턴](https://refactoring.guru/design-patterns)

---

**Happy Coding! 🚀**
