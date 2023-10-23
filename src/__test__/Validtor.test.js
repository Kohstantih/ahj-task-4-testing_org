import Validator from "../js/Validator";

test.each([
    ['6011111111111117', true],
    ['3530111333300001', false],
    ['371449635398431', true],
    ['4111111311111111', false],
])(('test card number verification function'), (value, expected) => {
    const received = Validator.calculation(value);
    
    expect(received).toBe(expected);
})