// 또 다른 예제 파일

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "노트북", price: 1500000 },
  { id: 2, name: "마우스", price: 30000 },
  { id: 3, name: "키보드", price: 80000 }
];

console.log("Example.ts 실행됨!");
console.log("총 제품 수:", products.length);
products.forEach(p => console.log(`- ${p.name}: ${p.price}원`));
