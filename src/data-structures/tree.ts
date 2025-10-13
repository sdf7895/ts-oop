/**
 * Tree (트리)
 *
 * **개념**
 * - 계층적 구조를 표현하는 자료구조
 * - 루트 노드에서 시작해서 자식 노드들로 연결
 * - 사이클이 없음
 *
 * **용어**
 * - Root: 최상위 노드
 * - Leaf: 자식이 없는 노드
 * - Height: 루트에서 가장 깊은 리프까지 거리
 * - Depth: 루트에서 특정 노드까지 거리
 *
 * **시간 복잡도**
 * - Binary Tree: 탐색 O(n), 삽입 O(n), 삭제 O(n)
 * - BST (평균): 탐색/삽입/삭제 O(log n)
 * - BST (최악): 탐색/삽입/삭제 O(n) - 한쪽으로 치우친 경우
 */

// ============================================
// Binary Tree Node (이진 트리 노드)
// ============================================
class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

// ============================================
// Binary Tree (이진 트리)
// ============================================
class BinaryTree<T> {
    root: TreeNode<T> | null = null;

    /**
     * 레벨 순서로 삽입 (Complete Binary Tree 유지)
     */
    insert(value: T): void {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        // BFS로 빈 자리 찾기
        const queue: TreeNode<T>[] = [this.root];

        while (queue.length > 0) {
            const current = queue.shift()!;

            if (!current.left) {
                current.left = newNode;
                return;
            }

            if (!current.right) {
                current.right = newNode;
                return;
            }

            queue.push(current.left);
            queue.push(current.right);
        }
    }

    /**
     * 전위 순회 (Pre-order): Root → Left → Right
     * 사용: 트리 복사, 표현식 트리의 전위 표기
     */
    preOrder(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];

        return [
            node.value,
            ...this.preOrder(node.left),
            ...this.preOrder(node.right)
        ];
    }

    /**
     * 중위 순회 (In-order): Left → Root → Right
     * 사용: BST에서 정렬된 순서로 출력
     */
    inOrder(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];

        return [
            ...this.inOrder(node.left),
            node.value,
            ...this.inOrder(node.right)
        ];
    }

    /**
     * 후위 순회 (Post-order): Left → Right → Root
     * 사용: 트리 삭제, 표현식 트리의 후위 표기
     */
    postOrder(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];

        return [
            ...this.postOrder(node.left),
            ...this.postOrder(node.right),
            node.value
        ];
    }

    /**
     * 레벨 순회 (Level-order): BFS 방식
     * 사용: 레벨별 처리, 최단 경로
     */
    levelOrder(): T[] {
        if (!this.root) return [];

        const result: T[] = [];
        const queue: TreeNode<T>[] = [this.root];

        while (queue.length > 0) {
            const current = queue.shift()!;
            result.push(current.value);

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }

        return result;
    }

    /**
     * 트리 높이 계산
     */
    height(node: TreeNode<T> | null = this.root): number {
        if (!node) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    /**
     * 탐색
     */
    search(value: T, node: TreeNode<T> | null = this.root): boolean {
        if (!node) return false;
        if (node.value === value) return true;

        return this.search(value, node.left) || this.search(value, node.right);
    }
}

// ============================================
// Binary Search Tree (이진 탐색 트리)
// ============================================
/**
 * BST 규칙: 왼쪽 < 부모 < 오른쪽
 */
class BinarySearchTree<T> {
    root: TreeNode<T> | null = null;

    /**
     * 삽입 - O(log n) 평균, O(n) 최악
     */
    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
        if (!node) return new TreeNode(value);

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        }

        return node;
    }

    /**
     * 탐색 - O(log n) 평균, O(n) 최악
     */
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode<T> | null, value: T): boolean {
        if (!node) return false;
        if (value === node.value) return true;

        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }

    /**
     * 삭제 - O(log n) 평균
     * 3가지 케이스:
     * 1. 리프 노드: 그냥 제거
     * 2. 자식 1개: 자식으로 대체
     * 3. 자식 2개: Inorder Successor로 대체
     */
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // 노드 찾음!

            // Case 1: 리프 노드
            if (!node.left && !node.right) {
                return null;
            }

            // Case 2: 자식 1개
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Case 3: 자식 2개
            // Inorder Successor (오른쪽 서브트리의 최솟값)
            const successor = this.findMin(node.right);
            node.value = successor.value;
            node.right = this.deleteNode(node.right, successor.value);
        }

        return node;
    }

    /**
     * 최솟값 찾기 - 가장 왼쪽 노드
     */
    findMin(node: TreeNode<T> = this.root!): TreeNode<T> {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    /**
     * 최댓값 찾기 - 가장 오른쪽 노드
     */
    findMax(node: TreeNode<T> = this.root!): TreeNode<T> {
        while (node.right) {
            node = node.right;
        }
        return node;
    }

    /**
     * 중위 순회 - BST에서는 정렬된 순서!
     */
    inOrder(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];

        return [
            ...this.inOrder(node.left),
            node.value,
            ...this.inOrder(node.right)
        ];
    }

    /**
     * 유효한 BST인지 확인
     */
    isValidBST(): boolean {
        return this.validateBST(this.root, null, null);
    }

    private validateBST(
        node: TreeNode<T> | null,
        min: T | null,
        max: T | null
    ): boolean {
        if (!node) return true;

        if ((min !== null && node.value <= min) ||
            (max !== null && node.value >= max)) {
            return false;
        }

        return (
            this.validateBST(node.left, min, node.value) &&
            this.validateBST(node.right, node.value, max)
        );
    }
}

// ============================================
// 테스트 코드
// ============================================

console.log('=== Binary Tree 테스트 ===');
const tree = new BinaryTree<number>();

tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);

/**
 * 구조:
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 */

console.log('Pre-order:', tree.preOrder());   // [1, 2, 4, 5, 3]
console.log('In-order:', tree.inOrder());     // [4, 2, 5, 1, 3]
console.log('Post-order:', tree.postOrder()); // [4, 5, 2, 3, 1]
console.log('Level-order:', tree.levelOrder()); // [1, 2, 3, 4, 5]
console.log('Height:', tree.height());         // 2

console.log('\n=== Binary Search Tree 테스트 ===');
const bst = new BinarySearchTree<number>();

bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

/**
 * BST 구조:
 *        50
 *       /  \
 *      30   70
 *     / \   / \
 *    20 40 60 80
 */

console.log('In-order (정렬됨):', bst.inOrder()); // [20, 30, 40, 50, 60, 70, 80]
console.log('30 찾기:', bst.search(30));  // true
console.log('100 찾기:', bst.search(100)); // false

console.log('\n삭제 전:', bst.inOrder());
bst.delete(30); // 자식 2개인 노드 삭제
console.log('30 삭제 후:', bst.inOrder());

console.log('최솟값:', bst.findMin().value); // 20
console.log('최댓값:', bst.findMax().value); // 80
console.log('유효한 BST?', bst.isValidBST()); // true
