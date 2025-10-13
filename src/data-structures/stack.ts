/**
 * **개념**
- LIFO (Last In First Out) - 후입선출
- 가장 최근에 추가된 항목이 가장 먼저 제거됨

**주요 연산**
- `push()`: 맨 위에 추가 - O(1)
- `pop()`: 맨 위에서 제거 - O(1)
- `peek()`: 맨 위 확인 - O(1)
- `isEmpty()`: 비어있는지 확인 - O(1)

**시간 복잡도**
- 모든 기본 연산: O(1)

**장점**
- 단순하고 효율적
- 재귀 호출 관리
- 역추적 가능

**단점**
- 중간 요소 접근 불가
- 크기 제한 (배열 기반인 경우)
*/

interface Stack<T>{
  readonly size : number;
  push(value : T) : void
  peek() : T
  pop() : T
  isEmpty() : boolean
}

type StackNode<T> = {
  value : T;
  next? : StackNode<T>
}

class StackImpl<T> implements Stack<T>{
  
  private _size : number  = 0;
  private head? : StackNode<T>;

  constructor(private readonly capacity : number){
  }

  get size() {
    return this._size; 
  }
  
  push(value: T): void {
    if(this._size === this.capacity){
      throw new Error("스택이 꽉 찼어요");
    }

    const node = { value , next : this.head };
    this.head = node;
    this._size++;
  }
  
  pop(): T {
    if(this._size === 0 || !this.head){
      throw new Error("데이터가없어요")
    }

    const first = this.head.value
    this.head = this.head.next

    this._size--;

    return first
  }
  
  peek(): T {
    if(!this.head){
      throw new Error('데이터 없어요')
    }

    return this.head?.value
  }

  isEmpty(): boolean {
    if(!this.head){
      return true
    }
    return false
  }
}


const stack = new StackImpl(3)

stack.push("hi")
stack.push(1)
stack.push({ name : 'hi' })