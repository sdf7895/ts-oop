export {};

class TicketType {
    private ticketType: string[] = ["영화","콘서트","연극","전시회","스포츠","문화축제","기타"];
    constructor(){

    }

    displayTicketType(){
        this.ticketType.forEach((type, index) => {
            console.log(`${index + 1}. ${type}`);
        });
        console.log(`----------------------------`);
    }

    getTicketType(selected: number){
        if(selected > 0 && selected <= this.ticketType.length){
            const INDEX_OFFSET = 1;
            return this.ticketType[selected - INDEX_OFFSET];
        }

        return "존재하지 않는 티켓 종류입니다.";
    }

    updateTicketType(type: string){
        this.ticketType.push(type);
    }
}

class PaymentMethod {
    private paymentMethod: string[] = ["카드","현금","계좌이체","온라인결제"];
    constructor(){
        
    }

    displayPaymentMethod(){
        this.paymentMethod.forEach((method, index) => {
            console.log(`${index + 1}. ${method}`);
        });
        console.log(`----------------------------`);
    }

    getPaymentMethod(selected: number){
        if(selected > 0 && selected <= this.paymentMethod.length){
            const INDEX_OFFSET = 1;
            return this.paymentMethod[selected - INDEX_OFFSET];
        }

        return "존재하지 않는 결제 방법입니다.";
    }

    updatePaymentMethod(method: string){
        this.paymentMethod.push(method);
    }
}

class Reservation {
    private reservationPrice : number = 0 
    constructor(
        private paymentMethod: PaymentMethod
    ){
    }

    get getReservationPrice() : number{
        return this.reservationPrice
    }

    makeReservation(reservationPrice : number,ticketType : TicketType, policies : Policy[]){
        this.reservationPrice = reservationPrice

        policies.forEach((policy) => {
            this.reservationPrice = policy.discount(this.reservationPrice)
        })

        const discountDesc = policies.map(policy => policy.getPolicyType()).join(',')

        console.log(`예약 티켓 종류 : ${ticketType.getTicketType(1)}
            \n예약 결제 방법 : ${this.paymentMethod.getPaymentMethod(1)}
            \n할인 내역 : ${discountDesc}
            \n예약 금액 : ${this.reservationPrice.toLocaleString()}원
            \n예약 완료
            \n`);

        console.log('예약 완료 결제를 진행해주세요 \n')
    }
}

class Payment {
    constructor(
        private paymentMethod: PaymentMethod
    ){
    }

    makePayment(paymentPrice : number,ticketType : TicketType){
        console.log(`결제 티켓 종류 : ${ticketType.getTicketType(1)}
            \n결제 결제 방법 : ${this.paymentMethod.getPaymentMethod(1)}
            \n예약 결제 금액 : ${paymentPrice.toLocaleString()}원
            \n결제 완료`);
    }
}

/**
 * 정책
  1. 조조할인 - 오전 10시 이전 상영 (4,000원)
  2. 심야할인 - 밤 10시 이후 상영 (3,000원)
  3. 카드할인 - 특정 카드사 제휴 (30%)
  4. 다자녀할인 - 다자녀 가정 (30%)
  5. 경로우대 - 만 65세 이상 (50%)
*/
abstract class Policy {
    abstract discount(price: number): number
    abstract getPolicyType(): string
}

class DefaultDiscount extends Policy{
    discount(price: number): number {
        return price
    }
    getPolicyType(): string {
        return '할인없음'
    }
}

// 조조할인 - 오전 10시 이전 상영 (4,000원 할인)
class EarlyBirdDiscount extends Policy {
    getPolicyType() {
        return '조조할인'
    }

    discount(price: number): number {
        return price - 4000
    }
}

// 심야할인 - 밤 10시 이후 상영 (3,000원 할인)
class LateNightDiscount extends Policy {
    getPolicyType(): string {
        return '심야할인';
    }

    discount(price: number): number {
        return price - 3000;
    }
}

// 카드할인 - 특정 카드사 제휴 (30% 할인)
class CardDiscount extends Policy {
    getPolicyType(): string {
        return '카드할인';
    }

    discount(price: number): number {
        return price * 0.7;
    }
}

// 다자녀할인 - 다자녀 가정 (30% 할인)
class MultiChildDiscount extends Policy {
    getPolicyType(): string {
        return '다자녀할인';
    }

    discount(price: number): number {
        return price * 0.7;
    }
}

// 경로우대 - 만 65세 이상 (50% 할인)
class SeniorDiscount extends Policy {
    getPolicyType(): string {
        return '경로우대';
    }

    discount(price: number): number {
        return price * 0.5;
    }
}




class TicketMachine {
    constructor(
        private ticketType: TicketType,
        private paymentMethod: PaymentMethod,
        private payment: Payment,
        private reservation : Reservation
    ){

    }

    selectedTicketType(){
        this.ticketType.displayTicketType();
    }

    selectedPaymentMethod(){
        this.paymentMethod.displayPaymentMethod();
    }
    
    processReservation(price : number,policy: Policy[]){
        this.reservation.makeReservation(price,this.ticketType,policy)
    }

    processPayment(){
        this.payment.makePayment(this.reservation.getReservationPrice,this.ticketType)
    }

}   

const ticketType = new TicketType();
const paymentMethod = new PaymentMethod();
const reservation = new Reservation(paymentMethod);
const payment = new Payment(paymentMethod);

const ticketMachine = new TicketMachine(
    ticketType, 
    paymentMethod,
    payment,
    reservation
);

// ticketMachine.seletedTicketType();
// ticketType.updateTicketType("뮤지컬");
// ticketMachine.seletedTicketType();


// ticketMachine.seletedPaymentMethod();
// paymentMethod.updatePaymentMethod("휴대폰결제");
// ticketMachine.seletedPaymentMethod();

ticketMachine.processReservation(10000,[new EarlyBirdDiscount(), new CardDiscount()])
ticketMachine.processPayment()