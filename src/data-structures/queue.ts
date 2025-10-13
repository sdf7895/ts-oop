/**
 * **개념**
- FIFO (First In First Out) - 선입선출
- 먼저 들어간 항목이 먼저 나옴

**주요 연산**
- `enqueue()`: 뒤에 추가 - O(1)
- `dequeue()`: 앞에서 제거 - O(1)
- `isEmpty()`: 비어있는지 확인 - O(1)

**시간 복잡도**
- 모든 기본 연산: O(1)

**종류**
1. **Simple Queue**: 기본 큐
2. **Circular Queue**: 원형 큐 (메모리 효율적)
3. **Deque**: 양쪽 끝에서 삽입/삭제 가능
4. **Priority Queue**: 우선순위 기반

**장점**
- 순서 보장
- 공정한 처리 (FIFO)
- 버퍼링에 적합

**단점**
- 중간 요소 접근/수정 불가
- 크기 관리 필요
*/

interface Queue<T>{
    size: number
    enqueue(value : T) : void 
    dequeue() : T
    isEmpty() : boolean
}

type QueueNode<T> = {
    value : T
    next? : QueueNode<T>
}

class QueueImp<T> implements Queue<T>{
    private _size : number = 0;
    private head? : QueueNode<T>;
    private tail? : QueueNode<T>; 

    constructor(private readonly capacity : number){}

    get size() : number {
        return this._size;
    }

    enqueue(value: T): void {
        if(this._size === this.capacity){
            throw new Error("큐가 꽉찼어요");
        }

        const newNode = { value }
        if(this._size === 0){
            this.head = newNode
            this.tail = newNode
        }else {
            this.tail!.next = newNode
            this.tail = newNode
        }

        this._size++;
    }

    dequeue(): T {
        if(this._size === 0 || !this.head){
            throw new Error("데이터가 없어요")
        }

        const value = this.head.value;
        this.head = this.head.next;

        if(!this.head){
            this.tail = undefined
        }

        this._size--;
        return value;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }
}

const queue = new QueueImp(4)

queue.enqueue('hi')
queue.enqueue(1)
queue.enqueue({ name : 'test' })
queue.enqueue({ price : 1000 })

console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())