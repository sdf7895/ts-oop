/**
 * **개념**
- 각 요소가 우선순위를 가지며, 높은 우선순위가 먼저 처리됨
- 일반적으로 Heap으로 구현

**시간 복잡도**
- 삽입: O(log n)
- 삭제 (최고 우선순위): O(log n)
- 확인: O(1)

**구현 방법**
1. 배열: 삽입 O(n), 삭제 O(1)
2. 연결 리스트: 삽입 O(n), 삭제 O(1)
3. **Heap**: 삽입 O(log n), 삭제 O(log n) ✅ 권장

**장점**
- 효율적인 최댓값/최솟값 접근
- 다양한 알고리즘에 활용

**단점**
- 일반적인 큐보다 복잡
- 모든 요소 순회 비효율적

**실무 활용**
- CPU 작업 스케줄링
- Dijkstra 최단 경로 알고리즘
- A* 경로 탐색
- 이벤트 시뮬레이션
- Huffman 코딩
- 실시간 시스템
*/



// 제네릭으로 개선한 MinHeap (비교 함수 지원)
class MinHeap<T> {
    private heap: Array<T> = [];

    // 비교 함수: (a, b) => a < b이면 true
    constructor(private compareFn?: (a: T, b: T) => boolean) {}

    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndex(index: number): number {
        return (index * 2) + 1;
    }

    private getRightChildIndex(index: number): number {
        return (index * 2) + 2;
    }

    // 비교 로직 (커스텀 함수 또는 기본 < 연산)
    private compare(a: T, b: T): boolean {
        if (this.compareFn) {
            return this.compareFn(a, b);
        }
        return a < b;
    }

    insert(value: T): void {
        this.heap.push(value);
        this.heapifyUp();
    }

    remove(): T {
        if (this.heap.length === 0) throw new Error('is not heap data');
        if (this.heap.length === 1) return this.heap.pop()!;

        const root = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();
        return root;
    }

    peek(): T | undefined {
        return this.heap[0];
    }

    size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private heapifyUp(): void {
        let lastIndex = this.heap.length - 1;
        while (lastIndex > 0) {
            const parentIndex = this.getParentIndex(lastIndex);

            if (this.compare(this.heap[lastIndex], this.heap[parentIndex])) {
                this.swap(parentIndex, lastIndex);
                lastIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    private heapifyDown(): void {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            let rightChildIndex = this.getRightChildIndex(index);

            if (
                rightChildIndex < this.heap.length &&
                this.compare(this.heap[rightChildIndex], this.heap[smallerChildIndex])
            ) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.compare(this.heap[smallerChildIndex], this.heap[index])) {
                this.swap(index, smallerChildIndex);
                index = smallerChildIndex;
            } else {
                break;
            }
        }
    }

    private swap(oldIndex: number, newIndex: number) {
        [this.heap[oldIndex], this.heap[newIndex]] = [this.heap[newIndex], this.heap[oldIndex]];
    }
}

// ============================================
// Priority Queue 구현 (MinHeap 기반)
// ============================================

type PriorityQueueElement<T> = {
    value: T;
    priority: number;
}

/**
 * PriorityQueue (우선순위 큐)
 * - priority 값이 낮을수록 먼저 처리됨
 * - MinHeap 기반으로 구현
 */
class PriorityQueue<T> {
    private heap: MinHeap<PriorityQueueElement<T>>;

    constructor() {
        // priority가 작은 것이 먼저 나오도록 비교 함수 설정
        this.heap = new MinHeap<PriorityQueueElement<T>>(
            (a, b) => a.priority < b.priority
        );
    }

    /**
     * 요소 추가
     * @param value 저장할 값
     * @param priority 우선순위 (낮을수록 먼저 처리)
     */
    enqueue(value: T, priority: number): void {
        this.heap.insert({ value, priority });
    }

    /**
     * 최고 우선순위 요소 제거 및 반환
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const element = this.heap.remove();
        return element.value;
    }

    /**
     * 최고 우선순위 요소 확인 (제거 안 함)
     */
    peek(): T | undefined {
        const element = this.heap.peek();
        return element?.value;
    }

    /**
     * 큐가 비어있는지 확인
     */
    isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    /**
     * 큐의 크기
     */
    size(): number {
        return this.heap.size();
    }
}

// ============================================
// 테스트 코드
// ============================================

console.log('=== MinHeap 테스트 ===');
const minHeap = new MinHeap<number>();

minHeap.insert(10);
minHeap.insert(15);
minHeap.insert(20);
minHeap.insert(35);
minHeap.insert(17);
minHeap.insert(1);

console.log('Heap 최솟값:', minHeap.peek()); // 1

console.log('제거:', minHeap.remove()); // 1
console.log('제거:', minHeap.remove()); // 10
console.log('제거:', minHeap.remove()); // 15
console.log('제거:', minHeap.remove()); // 17
console.log('제거:', minHeap.remove()); // 20

console.log('\n=== PriorityQueue 테스트 ===');
const pq = new PriorityQueue<string>();

// 작업 스케줄링 시뮬레이션
pq.enqueue('낮은 우선순위 작업', 10);
pq.enqueue('긴급 작업', 1);
pq.enqueue('중간 우선순위 작업', 5);
pq.enqueue('매우 긴급 작업', 0);
pq.enqueue('보통 작업', 7);

console.log('큐 크기:', pq.size());
console.log('다음 작업:', pq.peek());

console.log('\n작업 처리 순서:');
while (!pq.isEmpty()) {
    console.log('-', pq.dequeue());
}

console.log('\n=== PriorityQueue 실전 예제: 병원 응급실 ===');
type Patient = {
    name: string;
    age: number;
    symptom: string;
}

const emergencyRoom = new PriorityQueue<Patient>();

// 우선순위: 1(위급) ~ 5(경미)
emergencyRoom.enqueue(
    { name: '김철수', age: 45, symptom: '복통' },
    3
);
emergencyRoom.enqueue(
    { name: '이영희', age: 70, symptom: '심장 통증' },
    1
);
emergencyRoom.enqueue(
    { name: '박민수', age: 25, symptom: '감기' },
    5
);
emergencyRoom.enqueue(
    { name: '최지영', age: 35, symptom: '골절' },
    2
);

console.log('\n진료 순서:');
let order = 1;
while (!emergencyRoom.isEmpty()) {
    const patient = emergencyRoom.dequeue();
    console.log(`${order}. ${patient?.name} (${patient?.age}세) - ${patient?.symptom}`);
    order++;
}




