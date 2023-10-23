import CheckPaymentSystem from "../js/CheckPaymentSystem";
import paymentSystems from "../js/paymentSystems";

test.each([
    ['44556', 'visa'],
    ['53456899', 'mastercard'],
    ['2202567', 'mir'],
    ['1234567', null],
    ['37845340', 'american-express'],
    ['6011539', 'discover'],
    ['3540', 'jsb']
])(('test function of belonging to a specific payment system'), (value, expected) => {
    const checkPaymentSystem = new CheckPaymentSystem('', paymentSystems);
    const result = checkPaymentSystem.caller(value);
    expect(result).toBe(expected);
})