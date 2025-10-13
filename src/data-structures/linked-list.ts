/**
 * **개념**
- 노드들이 포인터로 연결된 선형 자료구조
- 각 노드는 데이터와 다음 노드를 가리키는 포인터 보유

**종류**
1. **Singly Linked List**: 한 방향으로만 순회
2. **Doubly Linked List**: 양방향 순회 가능
3. **Circular Linked List**: 마지막 노드가 첫 노드를 가리킴

**시간 복잡도**
- 접근: O(n)
- 탐색: O(n)
- 삽입 (head): O(1)
- 삭제 (head): O(1)
- 삽입/삭제 (특정 위치): O(n)

**장점**
- 동적 크기 조정 가능
- 삽입/삭제가 빠름 (위치를 알고 있을 때)
- 메모리 효율적 (필요한 만큼만 할당)

**단점**
- 인덱스 접근 불가 (순차 접근만 가능)
- 추가 메모리 필요 (포인터 저장)
- 캐시 효율성 낮음
*/

interface LinkedList<T>{
    size : number
    push(value : T) : void
}

type LinkedNode<T> = {
    value : T,
    next? : LinkedNode<T>
    prev? : LinkedNode<T>
}

class LinkedListImp<T> implements LinkedList<T>{
    private _size: number = 0
    private head? : LinkedNode<T>;
    private tail? : LinkedNode<T>;
    
    constructor(private capacity : number){}
    
    get size(){
        return this._size
    }

    push(value: T): void {
        if(this._size === this.capacity){
            throw new Error('꽉찼어요')
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

    print(){

        let current = this.head

        if(!this.head){
            this.tail = undefined
        }

        while(current){
            console.log(current.value)
            current = current.next
        }
    }
}

class DoublyLinkedListImp<T> implements LinkedList<T>{
    private _size: number = 0
    private head? : LinkedNode<T>;
    private tail? : LinkedNode<T>;
    
    constructor(private capacity : number){}
    
    get size(){
        return this._size
    }

    push(value: T): void {
        if(this._size === this.capacity){
            throw new Error('꽉찼어요')
        }

        const newNode : LinkedNode<T>  = { value }
        if(this._size === 0){
            this.head = newNode
            this.tail = newNode
        }else {
            newNode.prev = this.tail
            this.tail!.next = newNode
            this.tail = newNode
        }

        this._size++;
    }

    print(): void {
        if (!this.head) {
          console.log('리스트가 비어있습니다');
          return;
        }
  
        let current = this.head;
        while (current) {
          console.log(current.value);
          current = current.next!;
        }
      }
  
      // 거꾸로 출력 (양방향의 장점!)
      printReverse(): void {
        if (!this.tail) {
          console.log('리스트가 비어있습니다');
          return;
        }
  
        let current = this.tail;
        while (current) {
          console.log(current.value);
          current = current.prev!;  // prev로 이동!
        }
      }
  
}

const linkedList =  new LinkedListImp(10)
linkedList.push(10)
linkedList.push(20)
linkedList.push({ name : 'hihi' })
linkedList.push({ name : 'hihi2' })

const doublyLinkedList = new DoublyLinkedListImp(10)
doublyLinkedList.push(10)
doublyLinkedList.push(20)
doublyLinkedList.push({ name : 'hihi' })
doublyLinkedList.push({ name : 'hihi2' })

doublyLinkedList.print()