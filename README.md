# 🎮 TypeScript Playground

TypeScript로 배우는 **컴퓨터 과학 기초**와 **소프트웨어 설계 원칙** 학습 플레이그라운드입니다.

---

## 📚 학습 내용

### 1️⃣ 객체지향 프로그래밍 (OOP)
**티켓 예약 시스템을 통한 실전 OOP 학습**

- 📂 경로: [`src/ticket/`](./src/ticket/)
- 📖 상세 문서: [`src/ticket/README.md`](./src/ticket/README.md)
- 🎯 주요 내용:
  - **SOLID 원칙** 실전 적용
  - **디자인 패턴** (Strategy, Facade, DTO, Template Method)
  - **인터페이스와 추상 클래스** 활용
  - **컴포지션 패턴**으로 유연한 설계
  - **Mermaid 다이어그램**으로 구조 시각화

```bash
# 실행 방법
npm run dev src/ticket/composition_interface_ticket.ts
```

---

### 2️⃣ 자료구조 (Data Structures)
**기본부터 고급까지 핵심 자료구조 구현**

- 📂 경로: [`src/data-structures/`](./src/data-structures/)
- 📖 가이드: [`docs/data-structures-guide.md`](./docs/data-structures-guide.md)
- 🎯 구현 목록:
  - **기본**: LinkedList, Stack, Queue, Priority Queue
  - **트리**: Binary Tree, BST, Heap, Trie
  - **그래프**: DFS/BFS, 최단 경로 (Dijkstra)
  - **해시**: Hash Table (Chaining, Resizing)

```bash
# 실행 예시
npx tsx src/data-structures/priority-queue.ts
npx tsx src/data-structures/tree.ts
npx tsx src/data-structures/graph.ts
npx tsx src/data-structures/hash-table.ts
```

**핵심 이해:**
- Tree → 계층 구조 (React Virtual DOM, 파일 시스템)
- Graph → 관계/연결 (지도, SNS, 추천 시스템)
- Hash → 빠른 검색 (캐시, 중복 체크, O(1) 조회)

---

### 3️⃣ 알고리즘 (Algorithms)
**필수 알고리즘 패턴과 문제 해결 전략**

- 📖 가이드: [`docs/algorithms-guide.md`](./docs/algorithms-guide.md)
- 🎯 주요 내용:
  - **정렬**: Bubble, Selection, Insertion, Merge, Quick, Heap Sort
  - **탐색**: Binary Search, DFS, BFS
  - **패턴**: Greedy, Dynamic Programming, Two Pointer, Sliding Window, Backtracking
  - **그래프**: Dijkstra, Bellman-Ford, Kruskal, Prim, Topological Sort

```bash
# 알고리즘 구현 예시 (준비 중)
npx tsx src/algorithms/sorting.ts
npx tsx src/algorithms/searching.ts
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
│   ├── ticket/                     # 🎫 OOP 학습 (티켓 시스템)
│   │   ├── composition_ticket.ts
│   │   ├── composition_interface_ticket.ts
│   │   ├── discount_policy.ts
│   │   └── README.md              ⭐ OOP 상세 문서
│   │
│   ├── data-structures/            # 📊 자료구조 구현
│   │   ├── priority-queue.ts      # Heap + Priority Queue
│   │   ├── tree.ts                # Binary Tree, BST
│   │   ├── graph.ts               # Graph, DFS/BFS, Dijkstra
│   │   └── hash-table.ts          # Hash Table (Chaining)
│   │
│   └── algorithms/                 # 🧮 알고리즘 (준비 중)
│
├── docs/                           # 📖 학습 가이드
│   ├── data-structures-guide.md   # 자료구조 완벽 가이드
│   └── algorithms-guide.md        # 알고리즘 완벽 가이드
│
├── package.json
├── tsconfig.json
└── README.md                       📍 이 파일
```

---

## 🛠️ 기술 스택

- **TypeScript** - 타입 안정성과 최신 JavaScript 기능
- **tsx** - 빠른 TypeScript 실행 (빌드 없이 실행)
- **nodemon** - 파일 변경 감지 및 자동 재실행

---

## 📖 학습 가이드

### 🎫 객체지향 프로그래밍 (OOP)
👉 **[src/ticket/README.md](./src/ticket/README.md)** 에서 확인하세요!

**배울 수 있는 것:**
- SOLID 원칙이 실제 코드에서 어떻게 적용되는지
- 각 디자인 패턴의 장단점과 사용 시기
- 클래스 간 의사소통 방법 (인터페이스, 추상 클래스)
- Mermaid 다이어그램으로 구조 시각화

**실행 예시:**
```bash
# 할인 정책 테스트
npm run dev src/ticket/discount_policy.ts

# 전체 티켓 시스템
npm run dev src/ticket/composition_interface_ticket.ts
```

---

### 📊 자료구조
👉 **[docs/data-structures-guide.md](./docs/data-structures-guide.md)** 에서 개념을 학습하세요!

**배울 수 있는 것:**
- 각 자료구조의 **개념, 시간 복잡도, 실무 활용**
- **언제 무엇을 사용해야 하는지** 선택 기준
- **장단점 비교**와 Trade-off 이해
- 시간 복잡도 비교표

**실행 예시:**
```bash
# Priority Queue (Heap 기반)
npx tsx src/data-structures/priority-queue.ts

# Binary Tree & BST
npx tsx src/data-structures/tree.ts

# Graph (DFS/BFS, Dijkstra)
npx tsx src/data-structures/graph.ts

# Hash Table
npx tsx src/data-structures/hash-table.ts
```

---

### 🧮 알고리즘
👉 **[docs/algorithms-guide.md](./docs/algorithms-guide.md)** 에서 학습하세요!

**배울 수 있는 것:**
- **정렬 알고리즘** 비교 및 선택 기준
- **탐색 패턴** (DFS/BFS, Binary Search)
- **알고리즘 패턴** (Greedy, DP, Two Pointer, Backtracking)
- **그래프 알고리즘** (최단 경로, MST)
- 코딩 테스트 필수 알고리즘

---

## 💡 학습 접근법

### 1. 개념 먼저 (docs 폴더)
```bash
# 가이드 문서부터 읽기 (개념, 시간 복잡도, 실무 활용)
cat docs/data-structures-guide.md
cat docs/algorithms-guide.md
```

### 2. 실행해보기
```bash
# 구현 코드 실행하며 동작 확인
npx tsx src/data-structures/priority-queue.ts
npx tsx src/data-structures/graph.ts
```

### 3. 직접 구현하기
```bash
# 새 파일에서 직접 구현해보기
npx tsx src/my-practice.ts
```

---

## 🎯 학습 목표

- ✅ TypeScript 타입 시스템 이해
- ✅ 객체지향 프로그래밍 (SOLID 원칙, 디자인 패턴)
- ✅ 자료구조 (개념, 시간 복잡도, 실무 활용)
- ✅ 알고리즘 (정렬, 탐색, 패턴, 그래프)
- ⬜ 함수형 프로그래밍 (예정)
- ⬜ 비동기 프로그래밍 (예정)
- ⬜ 디자인 패턴 심화 (예정)

---

## 🔍 주요 특징

### 1. 실전 중심 학습
```typescript
// ❌ 이론만 배우기
"트리는 계층 구조입니다"

// ✅ 실전 연결
"React Virtual DOM이 트리 구조입니다"
"파일 시스템이 트리 구조입니다"
```

### 2. 완벽한 주석
```typescript
/**
 * Binary Search Tree (이진 탐색 트리)
 *
 * 시간 복잡도:
 * - 평균: O(log n)
 * - 최악: O(n) - 한쪽으로 치우친 경우
 *
 * 실무 활용:
 * - 데이터베이스 인덱스
 * - 자동완성
 */
```

### 3. 테스트 코드 포함
```typescript
// 각 파일에 실행 가능한 테스트 코드 포함
console.log('=== Priority Queue 테스트 ===');
const pq = new PriorityQueue<string>();
pq.enqueue('긴급 작업', 1);
```

---

## 📝 노트

### TypeScript 모듈 시스템
- 각 파일은 독립적인 모듈로 동작
- `export {}`로 모듈 선언

### Watch 모드
- 파일 변경 시 자동 재실행
- `Ctrl+C`로 종료

### 실행 방법
```bash
# tsx 사용 (빠름, 권장)
npx tsx src/파일명.ts

# nodemon 사용 (자동 재실행)
npm run dev src/파일명.ts
```

---

## 📚 참고 자료

### 기초
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [JavaScript MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript)

### 객체지향
- [SOLID 원칙](https://en.wikipedia.org/wiki/SOLID)
- [디자인 패턴](https://refactoring.guru/design-patterns)

### 자료구조 & 알고리즘
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)
- [VisuAlgo](https://visualgo.net/) - 알고리즘 시각화

---

## 🎓 학습 로드맵

### 1주차: OOP 기초
- [x] SOLID 원칙 이해
- [x] 티켓 시스템 분석
- [x] 디자인 패턴 적용

### 2주차: 자료구조 기본
- [x] LinkedList, Stack, Queue
- [x] Priority Queue (Heap)
- [x] 시간 복잡도 이해

### 3주차: 자료구조 고급
- [x] Tree, BST
- [x] Graph, DFS/BFS
- [x] Hash Table

### 4주차: 알고리즘
- [ ] 정렬 알고리즘
- [ ] 탐색 패턴
- [ ] 동적 계획법

---

## 🤝 기여 방법

이 프로젝트는 개인 학습용이지만, 개선 사항이 있다면:
1. 이슈 등록
2. PR 제출
3. 피드백 환영

---

## 📄 라이센스

MIT License - 자유롭게 사용하세요!

---

**Happy Learning! 🚀**

*"이론을 이해하고, 코드로 구현하고, 실전에 적용하자"*
