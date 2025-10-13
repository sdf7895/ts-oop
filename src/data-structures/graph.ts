/**
 * Graph (그래프)
 *
 * **개념**
 * - 정점(Vertex)과 간선(Edge)의 집합
 * - 네트워크, 관계를 표현
 *
 * **종류**
 * - 무방향 그래프: 간선에 방향 없음
 * - 방향 그래프: 간선에 방향 있음
 * - 가중치 그래프: 간선에 가중치(비용) 있음
 *
 * **표현 방법**
 * 1. 인접 행렬: 2D 배열, 공간 O(V²), 간선 확인 O(1)
 * 2. 인접 리스트: Map/Array, 공간 O(V+E), 간선 확인 O(degree)
 *
 * **시간 복잡도**
 * - DFS/BFS: O(V + E)
 * - 간선 추가: O(1)
 * - 간선 확인: 인접 리스트 O(degree), 인접 행렬 O(1)
 */

// ============================================
// Graph (인접 리스트 방식)
// ============================================
class Graph<T> {
    // 인접 리스트: Map<정점, 연결된 정점들>
    private adjacencyList: Map<T, Set<T>>;
    private directed: boolean; // 방향 그래프 여부

    constructor(directed: boolean = false) {
        this.adjacencyList = new Map();
        this.directed = directed;
    }

    /**
     * 정점 추가
     */
    addVertex(vertex: T): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, new Set());
        }
    }

    /**
     * 간선 추가
     */
    addEdge(from: T, to: T): void {
        // 정점이 없으면 추가
        this.addVertex(from);
        this.addVertex(to);

        // 간선 추가
        this.adjacencyList.get(from)!.add(to);

        // 무방향 그래프면 반대도 추가
        if (!this.directed) {
            this.adjacencyList.get(to)!.add(from);
        }
    }

    /**
     * 간선 제거
     */
    removeEdge(from: T, to: T): void {
        this.adjacencyList.get(from)?.delete(to);

        if (!this.directed) {
            this.adjacencyList.get(to)?.delete(from);
        }
    }

    /**
     * 정점 제거 (연결된 모든 간선도 제거)
     */
    removeVertex(vertex: T): void {
        if (!this.adjacencyList.has(vertex)) return;

        // 다른 정점들에서 이 정점으로 가는 간선 제거
        for (const neighbors of this.adjacencyList.values()) {
            neighbors.delete(vertex);
        }

        // 정점 제거
        this.adjacencyList.delete(vertex);
    }

    /**
     * 인접한 정점들 가져오기
     */
    getNeighbors(vertex: T): T[] {
        return Array.from(this.adjacencyList.get(vertex) || []);
    }

    /**
     * DFS (깊이 우선 탐색) - 재귀
     * 스택 또는 재귀 사용
     */
    dfs(start: T): T[] {
        const visited = new Set<T>();
        const result: T[] = [];

        const dfsHelper = (vertex: T) => {
            if (!vertex || visited.has(vertex)) return;

            visited.add(vertex);
            result.push(vertex);

            const neighbors = this.adjacencyList.get(vertex);
            if (neighbors) {
                for (const neighbor of neighbors) {
                    dfsHelper(neighbor);
                }
            }
        };

        dfsHelper(start);
        return result;
    }

    /**
     * DFS (반복 - 스택 사용)
     */
    dfsIterative(start: T): T[] {
        const visited = new Set<T>();
        const result: T[] = [];
        const stack: T[] = [start];

        while (stack.length > 0) {
            const vertex = stack.pop()!;

            if (visited.has(vertex)) continue;

            visited.add(vertex);
            result.push(vertex);

            const neighbors = this.adjacencyList.get(vertex);
            if (neighbors) {
                // 역순으로 push (재귀와 같은 순서 유지)
                for (const neighbor of Array.from(neighbors).reverse()) {
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }

        return result;
    }

    /**
     * BFS (너비 우선 탐색)
     * 큐 사용
     */
    bfs(start: T): T[] {
        const visited = new Set<T>();
        const result: T[] = [];
        const queue: T[] = [start];

        visited.add(start);

        while (queue.length > 0) {
            const vertex = queue.shift()!;
            result.push(vertex);

            const neighbors = this.adjacencyList.get(vertex);
            if (neighbors) {
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }

        return result;
    }

    /**
     * 경로 존재 여부 확인 (BFS)
     */
    hasPath(from: T, to: T): boolean {
        if (from === to) return true;

        const visited = new Set<T>();
        const queue: T[] = [from];
        visited.add(from);

        while (queue.length > 0) {
            const vertex = queue.shift()!;

            const neighbors = this.adjacencyList.get(vertex);
            if (neighbors) {
                for (const neighbor of neighbors) {
                    if (neighbor === to) return true;

                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }

        return false;
    }

    /**
     * 최단 경로 찾기 (BFS - 무가중치 그래프)
     */
    shortestPath(from: T, to: T): T[] | null {
        if (from === to) return [from];

        const visited = new Set<T>();
        const queue: Array<{ vertex: T, path: T[] }> = [{ vertex: from, path: [from] }];
        visited.add(from);

        while (queue.length > 0) {
            const { vertex, path } = queue.shift()!;

            const neighbors = this.adjacencyList.get(vertex);
            if (neighbors) {
                for (const neighbor of neighbors) {
                    if (neighbor === to) {
                        return [...path, neighbor];
                    }

                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push({ vertex: neighbor, path: [...path, neighbor] });
                    }
                }
            }
        }

        return null;
    }

    /**
     * 사이클 감지 (무방향 그래프)
     */
    hasCycle(): boolean {
        const visited = new Set<T>();

        const dfs = (vertex: T, parent: T | null): boolean => {
            visited.add(vertex);

            const neighbors = this.adjacencyList.get(vertex);
            if (neighbors) {
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        if (dfs(neighbor, vertex)) return true;
                    } else if (neighbor !== parent) {
                        // 방문했지만 부모가 아님 → 사이클!
                        return true;
                    }
                }
            }

            return false;
        };

        for (const vertex of this.adjacencyList.keys()) {
            if (!visited.has(vertex)) {
                if (dfs(vertex, null)) return true;
            }
        }

        return false;
    }

    /**
     * 그래프 출력 (디버깅용)
     */
    print(): void {
        for (const [vertex, neighbors] of this.adjacencyList) {
            console.log(`${vertex} → ${Array.from(neighbors).join(', ')}`);
        }
    }

    /**
     * 정점 개수
     */
    vertexCount(): number {
        return this.adjacencyList.size;
    }

    /**
     * 간선 개수
     */
    edgeCount(): number {
        let count = 0;
        for (const neighbors of this.adjacencyList.values()) {
            count += neighbors.size;
        }
        return this.directed ? count : count / 2;
    }
}

// ============================================
// Weighted Graph (가중치 그래프)
// ============================================
type Edge<T> = { to: T, weight: number };

class WeightedGraph<T> {
    private adjacencyList: Map<T, Edge<T>[]>;
    private directed: boolean;

    constructor(directed: boolean = false) {
        this.adjacencyList = new Map();
        this.directed = directed;
    }

    addVertex(vertex: T): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(from: T, to: T, weight: number): void {
        this.addVertex(from);
        this.addVertex(to);

        this.adjacencyList.get(from)!.push({ to, weight });

        if (!this.directed) {
            this.adjacencyList.get(to)!.push({ to: from, weight });
        }
    }

    /**
     * Dijkstra 최단 경로 알고리즘 (양수 가중치만)
     */
    dijkstra(start: T): Map<T, number> {
        const distances = new Map<T, number>();
        const visited = new Set<T>();

        // 모든 정점의 거리를 무한대로 초기화
        for (const vertex of this.adjacencyList.keys()) {
            distances.set(vertex, Infinity);
        }
        distances.set(start, 0);

        while (visited.size < this.adjacencyList.size) {
            // 방문 안 한 정점 중 최소 거리 찾기
            let minVertex: T | null = null;
            let minDistance = Infinity;

            for (const [vertex, distance] of distances) {
                if (!visited.has(vertex) && distance < minDistance) {
                    minVertex = vertex;
                    minDistance = distance;
                }
            }

            if (minVertex === null) break;

            visited.add(minVertex);

            // 인접 정점들의 거리 업데이트
            const edges = this.adjacencyList.get(minVertex);
            if (edges) {
                for (const edge of edges) {
                    const newDistance = distances.get(minVertex)! + edge.weight;
                    if (newDistance < distances.get(edge.to)!) {
                        distances.set(edge.to, newDistance);
                    }
                }
            }
        }

        return distances;
    }

    print(): void {
        for (const [vertex, edges] of this.adjacencyList) {
            const edgeStr = edges.map(e => `${e.to}(${e.weight})`).join(', ');
            console.log(`${vertex} → ${edgeStr}`);
        }
    }
}

// ============================================
// 테스트 코드
// ============================================

console.log('=== 무방향 그래프 테스트 ===');
const graph = new Graph<string>(false);

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');

/**
 * 구조:
 *     A
 *    / \
 *   B   C
 *    \ /
 *     D
 *     |
 *     E
 */

console.log('그래프 구조:');
graph.print();

console.log('\nDFS(A):', graph.dfs('A'));
console.log('BFS(A):', graph.bfs('A'));

console.log('\nA → E 경로:', graph.shortestPath('A', 'E'));
console.log('A → E 연결?', graph.hasPath('A', 'E'));

console.log('사이클 존재?', graph.hasCycle());

console.log('\n=== 가중치 그래프 (Dijkstra) ===');
const wGraph = new WeightedGraph<string>(true);

wGraph.addEdge('A', 'B', 4);
wGraph.addEdge('A', 'C', 2);
wGraph.addEdge('B', 'D', 3);
wGraph.addEdge('C', 'D', 1);
wGraph.addEdge('C', 'E', 5);
wGraph.addEdge('D', 'E', 1);

/**
 * 구조 (가중치):
 *     A
 *   4/ \2
 *   B   C
 *   3\ /1 \5
 *     D---E
 *       1
 */

console.log('가중치 그래프:');
wGraph.print();

console.log('\nA에서 모든 정점까지 최단 거리:');
const distances = wGraph.dijkstra('A');
for (const [vertex, distance] of distances) {
    console.log(`A → ${vertex}: ${distance}`);
}
