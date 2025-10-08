export {};

enum DiscountType {
    FIXED,      // 정액 할인 (조조, 심야)
    PERCENTAGE  // 정률 할인 (카드, 다자녀, 경로우대)
}

/**
 * 할인 정책
 * - 정액 할인: 조조할인(4,000원), 심야할인(3,000원)
 * - 정률 할인: 카드할인(30%), 다자녀할인(30%), 경로우대(50%)
 *
 * 규칙: 정액끼리만, 정률끼리만 중복 가능
 */
abstract class Policy {
    abstract discount(price: number): number;
    abstract getPolicyType(): string;
    abstract getDiscountType(): DiscountType;
}

class DefaultDiscount extends Policy {
    getPolicyType() { return '할인없음'; }
    getDiscountType() { return DiscountType.FIXED; }
    discount(price: number) { return price; }
}

// ===== 정액 할인 =====
class EarlyBirdDiscount extends Policy {
    getPolicyType() { return '조조할인'; }
    getDiscountType() { return DiscountType.FIXED; }
    discount(price: number) { return Math.max(0, price - 4000); }
}

class LateNightDiscount extends Policy {
    getPolicyType() { return '심야할인'; }
    getDiscountType() { return DiscountType.FIXED; }
    discount(price: number) { return Math.max(0, price - 3000); }
}

// ===== 정률 할인 =====
class CardDiscount extends Policy {
    getPolicyType() { return '카드할인'; }
    getDiscountType() { return DiscountType.PERCENTAGE; }
    discount(price: number) { return price * 0.7; }
}

class MultiChildDiscount extends Policy {
    getPolicyType() { return '다자녀할인'; }
    getDiscountType() { return DiscountType.PERCENTAGE; }
    discount(price: number) { return price * 0.7; }
}

class SeniorDiscount extends Policy {
    getPolicyType() { return '경로우대'; }
    getDiscountType() { return DiscountType.PERCENTAGE; }
    discount(price: number) { return price * 0.5; }
}

// ===== 할인 검증 및 적용 =====
class DiscountValidator {
    validate(policies: Policy[]): boolean {
        if (policies.length === 0) return true;

        const firstType = policies[0].getDiscountType();

        // 모두 같은 타입인지 확인
        const allSameType = policies.every(
            policy => policy.getDiscountType() === firstType
        );

        if (!allSameType) {
            console.log('❌ 정액 할인과 정률 할인은 함께 사용할 수 없습니다.');
            return false;
        }

        return true;
    }

    applyDiscounts(price: number, policies: Policy[]): { finalPrice: number, discountDesc: string } {
        if (!this.validate(policies)) {
            return {
                finalPrice: price,
                discountDesc: '할인 적용 실패 (정액/정률 혼합 불가)'
            };
        }

        let finalPrice = price;
        policies.forEach(policy => {
            finalPrice = policy.discount(finalPrice);
        });

        const discountDesc = policies.length > 0
            ? policies.map(p => p.getPolicyType()).join(', ')
            : '할인없음';

        return { finalPrice, discountDesc };
    }
}

// ===== 테스트 =====
const validator = new DiscountValidator();

console.log('=== 정액 할인 테스트 (조조 + 심야) ===');
const fixedPolicies = [new EarlyBirdDiscount(), new LateNightDiscount()];
const result1 = validator.applyDiscounts(10000, fixedPolicies);
console.log(`원가: 10,000원 → ${result1.finalPrice.toLocaleString()}원`);
console.log(`할인: ${result1.discountDesc}\n`);

console.log('=== 정률 할인 테스트 (카드 + 경로우대) ===');
const percentPolicies = [new CardDiscount(), new SeniorDiscount()];
const result2 = validator.applyDiscounts(10000, percentPolicies);
console.log(`원가: 10,000원 → ${result2.finalPrice.toLocaleString()}원`);
console.log(`할인: ${result2.discountDesc}\n`);

console.log('=== 혼합 할인 테스트 (조조 + 카드) ===');
const mixedPolicies = [new EarlyBirdDiscount(), new CardDiscount()];
const result3 = validator.applyDiscounts(10000, mixedPolicies);
console.log(`원가: 10,000원 → ${result3.finalPrice.toLocaleString()}원`);
console.log(`할인: ${result3.discountDesc}`);
