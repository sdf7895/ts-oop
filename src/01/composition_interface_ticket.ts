export {};

enum DiscountType {
    FIXED,      // 정액 할인
    PERCENTAGE  // 정률 할인
}

// 공통 선택 가능한 목록 인터페이스
interface Selectable {
    display(): void;
    get(selected: number): string | undefined;
    update(item: string): void;
}

abstract class Policy {
    abstract discount(price: number): number
    abstract getPolicyType(): string
    abstract getDiscountType(): DiscountType
}

// 예약 영수증
class ReservationReceipt {
    constructor(
        public readonly ticketType: string,
        public readonly paymentMethod: string,
        public readonly originalPrice: number,
        public readonly finalPrice: number,
        public readonly discountDesc: string
    ) {}

    getDiscountAmount(): number {
        return this.originalPrice - this.finalPrice;
    }
}

class DiscountValidator {
    validate(policies: Policy[]): boolean {
        if (policies.length === 0) return true;

        const firstType = policies[0].getDiscountType();
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

// 정액 할인들
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

// 정률 할인들
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


class TicketType implements Selectable {
    private ticketType: string[] = ["영화","콘서트","연극","전시회","스포츠","문화축제","기타"];

    display(){
        this.ticketType.forEach((type, index) => {
            console.log(`${index + 1}. ${type}`);
        });
        console.log(`----------------------------`);
    }

    get(selected: number): string | undefined {
        if(selected > 0 && selected <= this.ticketType.length){
            const INDEX_OFFSET = 1;
            return this.ticketType[selected - INDEX_OFFSET];
        }
        return "존재하지 않는 티켓 종류입니다.";
    }

    update(type: string){
        this.ticketType.push(type);
    }
}

class PaymentMethod implements Selectable {
    private paymentMethod: string[] = ["카드","현금","계좌이체","온라인결제"];

    display(){
        this.paymentMethod.forEach((method, index) => {
            console.log(`${index + 1}. ${method}`);
        });
        console.log(`----------------------------`);
    }

    get(selected: number): string | undefined {
        if(selected > 0 && selected <= this.paymentMethod.length){
            const INDEX_OFFSET = 1;
            return this.paymentMethod[selected - INDEX_OFFSET];
        }
        return "존재하지 않는 결제 방법입니다.";
    }

    update(method: string){
        this.paymentMethod.push(method);
    }
}

class Reservation {
    private validator = new DiscountValidator()

    constructor(
        private paymentMethod: PaymentMethod
    ){}

    makeReservation(price: number, ticketType: Selectable, policies: Policy[] = []): ReservationReceipt {
        const { finalPrice, discountDesc } = this.validator.applyDiscounts(price, policies);

        const receipt = new ReservationReceipt(
            ticketType.get(1) || '알 수 없음',
            this.paymentMethod.get(1) || '알 수 없음',
            price,
            finalPrice,
            discountDesc
        );

        console.log(`\n====== 예약 완료 ======`);
        console.log(`티켓 종류 : ${receipt.ticketType}`);
        console.log(`결제 방법 : ${receipt.paymentMethod}`);
        console.log(`할인 내역 : ${receipt.discountDesc}`);
        console.log(`원가 : ${receipt.originalPrice.toLocaleString()}원`);
        console.log(`최종 금액 : ${receipt.finalPrice.toLocaleString()}원`);
        console.log(`예약 완료 ✅\n`);

        return receipt;
    }
}

class Payment {
    processPayment(receipt: ReservationReceipt): void {
        console.log(`\n====== 결제 내역 ======`);
        console.log(`티켓 종류 : ${receipt.ticketType}`);
        console.log(`결제 방법 : ${receipt.paymentMethod}`);
        console.log(`할인 내역 : ${receipt.discountDesc}`);
        console.log(`원가 : ${receipt.originalPrice.toLocaleString()}원`);
        console.log(`할인 금액 : -${receipt.getDiscountAmount().toLocaleString()}원`);
        console.log(`최종 결제 금액 : ${receipt.finalPrice.toLocaleString()}원`);
        console.log(`결제 완료 ✅\n`);
    }
}



class TicketMachine {
    private selectedPolicies: Policy[] = [];
    private currentReceipt?: ReservationReceipt;

    constructor(
        private ticketType: Selectable,
        private paymentMethod: Selectable,
        private payment: Payment,
        private reservation: Reservation
    ){

    }

    selectedTicketType(){
        this.ticketType.display();
    }

    selectedPaymentMethod(){
        this.paymentMethod.display();
    }

    // 할인 정책 선택
    selectDiscountPolicy(policies: Policy[]){
        this.selectedPolicies = policies;
        console.log(`\n선택된 할인 정책: ${policies.map(p => p.getPolicyType()).join(', ')}`);
    }

    // 예약 (할인 적용)
    processReservation(price: number): ReservationReceipt {
        this.currentReceipt = this.reservation.makeReservation(price, this.ticketType, this.selectedPolicies);
        return this.currentReceipt;
    }

    // 결제
    processPayment(receipt?: ReservationReceipt): void {
        const receiptToUse = receipt || this.currentReceipt;

        if (!receiptToUse) {
            console.log('❌ 예약 내역이 없습니다. 먼저 예약을 진행해주세요.');
            return;
        }

        this.payment.processPayment(receiptToUse);
    }

}

const ticketType = new TicketType();
const paymentMethod = new PaymentMethod();
const reservation = new Reservation(paymentMethod);
const payment = new Payment();

const ticketMachine = new TicketMachine(
    ticketType,
    paymentMethod,
    payment,
    reservation
);

// ticketMachine.selectedTicketType();
// ticketType.updateTicketType("뮤지컬");
// ticketMachine.selectedTicketType();


// ticketMachine.selectedPaymentMethod();
// paymentMethod.updatePaymentMethod("휴대폰결제");
// ticketMachine.selectedPaymentMethod();

// ===== 테스트 케이스 =====

console.log('=== 케이스 1: 정액 할인 (조조 + 심야) ===');
ticketMachine.selectDiscountPolicy([new EarlyBirdDiscount(), new LateNightDiscount()]);
ticketMachine.processReservation(10000);
ticketMachine.processPayment();

console.log('\n=== 케이스 2: 정률 할인 (카드 + 경로우대) ===');
ticketMachine.selectDiscountPolicy([new CardDiscount(), new SeniorDiscount()]);
ticketMachine.processReservation(10000);
ticketMachine.processPayment();

console.log('\n=== 케이스 3: 혼합 할인 시도 (조조 + 카드) - 실패 예상 ===');
ticketMachine.selectDiscountPolicy([new EarlyBirdDiscount(), new CardDiscount()]);
ticketMachine.processReservation(10000);
ticketMachine.processPayment();
