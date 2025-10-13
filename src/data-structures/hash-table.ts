/**
 * Hash Table (해시 테이블)
 *
 * **개념**
 * - Key-Value 쌍을 저장
 * - 해시 함수로 키를 인덱스로 변환
 * - 평균 O(1) 시간에 삽입, 삭제, 조회
 *
 * **해시 함수**
 * - 같은 입력 → 같은 출력 (일관성)
 * - 빠른 계산
 * - 균등 분포 (충돌 최소화)
 *
 * **충돌 해결**
 * 1. Chaining (체이닝): 연결 리스트로 같은 인덱스 저장
 * 2. Open Addressing (개방 주소법): 다른 빈 버킷 찾기
 *
 * **Load Factor**
 * - α = n / m (원소 수 / 버킷 수)
 * - 0.7 이상이면 리사이징 권장
 *
 * **시간 복잡도**
 * - 평균: O(1) - 삽입, 삭제, 조회
 * - 최악: O(n) - 모든 키가 충돌
 */

// ============================================
// Hash Table (Chaining 방식)
// ============================================

type KeyValuePair<K, V> = {
    key: K;
    value: V;
}

class HashTable<K, V> {
    private table: Array<KeyValuePair<K, V>[]>;
    private size: number = 0;
    private capacity: number;
    private readonly LOAD_FACTOR_THRESHOLD = 0.75;

    constructor(capacity: number = 16) {
        this.capacity = capacity;
        this.table = new Array(capacity);

        // 각 버킷을 빈 배열로 초기화
        for (let i = 0; i < capacity; i++) {
            this.table[i] = [];
        }
    }

    /**
     * 해시 함수
     * - 문자열을 숫자로 변환
     * - 간단한 구현 (실무에서는 더 복잡한 해시 함수 사용)
     */
    private hash(key: K): number {
        const str = String(key);
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) % this.capacity;
        }

        return hash;
    }

    /**
     * Load Factor 계산
     */
    private getLoadFactor(): number {
        return this.size / this.capacity;
    }

    /**
     * 리사이징 (해시 테이블 크기 2배로)
     */
    private resize(): void {
        console.log(`리사이징: ${this.capacity} → ${this.capacity * 2}`);

        const oldTable = this.table;
        this.capacity *= 2;
        this.table = new Array(this.capacity);
        this.size = 0;

        // 새 테이블 초기화
        for (let i = 0; i < this.capacity; i++) {
            this.table[i] = [];
        }

        // 모든 원소를 새 테이블에 재삽입
        for (const bucket of oldTable) {
            for (const pair of bucket) {
                this.set(pair.key, pair.value);
            }
        }
    }

    /**
     * 삽입 또는 업데이트
     * 시간 복잡도: 평균 O(1), 최악 O(n)
     */
    set(key: K, value: V): void {
        // Load Factor 확인 및 리사이징
        if (this.getLoadFactor() > this.LOAD_FACTOR_THRESHOLD) {
            this.resize();
        }

        const index = this.hash(key);
        const bucket = this.table[index];

        // 이미 존재하는 키면 업데이트
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }

        // 새 키 추가
        bucket.push({ key, value });
        this.size++;
    }

    /**
     * 조회
     * 시간 복잡도: 평균 O(1), 최악 O(n)
     */
    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.table[index];

        for (const pair of bucket) {
            if (pair.key === key) {
                return pair.value;
            }
        }

        return undefined;
    }

    /**
     * 키 존재 여부 확인
     */
    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    /**
     * 삭제
     * 시간 복잡도: 평균 O(1), 최악 O(n)
     */
    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.table[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    /**
     * 모든 키 가져오기
     */
    keys(): K[] {
        const keys: K[] = [];

        for (const bucket of this.table) {
            for (const pair of bucket) {
                keys.push(pair.key);
            }
        }

        return keys;
    }

    /**
     * 모든 값 가져오기
     */
    values(): V[] {
        const values: V[] = [];

        for (const bucket of this.table) {
            for (const pair of bucket) {
                values.push(pair.value);
            }
        }

        return values;
    }

    /**
     * 모든 키-값 쌍 가져오기
     */
    entries(): Array<[K, V]> {
        const entries: Array<[K, V]> = [];

        for (const bucket of this.table) {
            for (const pair of bucket) {
                entries.push([pair.key, pair.value]);
            }
        }

        return entries;
    }

    /**
     * 초기화
     */
    clear(): void {
        this.table = new Array(this.capacity);
        for (let i = 0; i < this.capacity; i++) {
            this.table[i] = [];
        }
        this.size = 0;
    }

    /**
     * 크기
     */
    getSize(): number {
        return this.size;
    }

    /**
     * 빈 테이블인지
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * 충돌 통계 (디버깅용)
     */
    getCollisionStats(): { maxChainLength: number, averageChainLength: number } {
        let maxChainLength = 0;
        let totalChainLength = 0;
        let usedBuckets = 0;

        for (const bucket of this.table) {
            const length = bucket.length;
            if (length > 0) {
                usedBuckets++;
                totalChainLength += length;
                maxChainLength = Math.max(maxChainLength, length);
            }
        }

        return {
            maxChainLength,
            averageChainLength: usedBuckets > 0 ? totalChainLength / usedBuckets : 0
        };
    }

    /**
     * 테이블 상태 출력 (디버깅용)
     */
    print(): void {
        console.log(`\n해시 테이블 (크기: ${this.size}, 용량: ${this.capacity})`);
        console.log(`Load Factor: ${this.getLoadFactor().toFixed(2)}`);

        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i].length > 0) {
                const items = this.table[i]
                    .map(pair => `${pair.key}=${pair.value}`)
                    .join(', ');
                console.log(`[${i}]: ${items}`);
            }
        }

        const stats = this.getCollisionStats();
        console.log(`\n충돌 통계:`);
        console.log(`- 최대 체인 길이: ${stats.maxChainLength}`);
        console.log(`- 평균 체인 길이: ${stats.averageChainLength.toFixed(2)}`);
    }
}

// ============================================
// 테스트 코드
// ============================================

console.log('=== Hash Table 기본 테스트 ===');
const hashTable = new HashTable<string, number>(8);

// 삽입
hashTable.set('apple', 100);
hashTable.set('banana', 200);
hashTable.set('orange', 300);
hashTable.set('grape', 400);

console.log('apple:', hashTable.get('apple'));   // 100
console.log('banana:', hashTable.get('banana')); // 200

// 업데이트
hashTable.set('apple', 150);
console.log('apple (업데이트):', hashTable.get('apple')); // 150

// 존재 여부
console.log('grape 존재?', hashTable.has('grape'));   // true
console.log('melon 존재?', hashTable.has('melon'));   // false

// 삭제
hashTable.delete('banana');
console.log('banana (삭제 후):', hashTable.get('banana')); // undefined

console.log('\n모든 키:', hashTable.keys());
console.log('모든 값:', hashTable.values());
console.log('크기:', hashTable.getSize());

hashTable.print();

console.log('\n=== 리사이징 테스트 ===');
const smallTable = new HashTable<string, number>(4);

console.log('초기 용량: 4');
for (let i = 0; i < 10; i++) {
    smallTable.set(`key${i}`, i * 10);
    console.log(`key${i} 삽입 - Load Factor: ${(smallTable.getSize() / 4).toFixed(2)}`);
}

smallTable.print();

console.log('\n=== 실전 예제: 단어 빈도 계산 ===');
const text = "hello world hello javascript world hello";
const words = text.split(' ');

const wordCount = new HashTable<string, number>();

for (const word of words) {
    const count = wordCount.get(word) || 0;
    wordCount.set(word, count + 1);
}

console.log('\n단어 빈도:');
for (const [word, count] of wordCount.entries()) {
    console.log(`${word}: ${count}번`);
}

console.log('\n=== 실전 예제: 캐시 구현 ===');
class SimpleCache<K, V> {
    private cache: HashTable<K, V>;
    private maxSize: number;
    private accessOrder: K[] = []; // LRU 순서

    constructor(maxSize: number = 100) {
        this.cache = new HashTable<K, V>();
        this.maxSize = maxSize;
    }

    get(key: K): V | undefined {
        const value = this.cache.get(key);

        if (value !== undefined) {
            // LRU: 최근 사용한 것을 뒤로
            this.updateAccessOrder(key);
        }

        return value;
    }

    set(key: K, value: V): void {
        // 캐시 크기 초과 시 가장 오래된 것 제거
        if (!this.cache.has(key) && this.cache.getSize() >= this.maxSize) {
            const oldest = this.accessOrder.shift();
            if (oldest) {
                this.cache.delete(oldest);
            }
        }

        this.cache.set(key, value);
        this.updateAccessOrder(key);
    }

    private updateAccessOrder(key: K): void {
        // 기존 위치에서 제거
        const index = this.accessOrder.indexOf(key);
        if (index > -1) {
            this.accessOrder.splice(index, 1);
        }
        // 맨 뒤에 추가
        this.accessOrder.push(key);
    }

    has(key: K): boolean {
        return this.cache.has(key);
    }

    getSize(): number {
        return this.cache.getSize();
    }
}

const cache = new SimpleCache<string, string>(3);

cache.set('page1', 'content1');
cache.set('page2', 'content2');
cache.set('page3', 'content3');
console.log('캐시 크기:', cache.getSize()); // 3

cache.set('page4', 'content4'); // page1이 제거됨
console.log('page1 존재?', cache.has('page1')); // false
console.log('page4 존재?', cache.has('page4')); // true
console.log('캐시 크기:', cache.getSize()); // 3
