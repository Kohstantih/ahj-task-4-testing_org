import Validator from "../js/Validator";

test.each([
    ['6011111111111117', 'valid', true],
    ['3530111333300001', 'fail', true]
])(('Check validation card number %i %s'), (number, color, expected) => {
    document.body.innerHTML = '<form class="form_valid_card"><input type="number" class="input"><button class="button">Проверить</button></form><div class="inform"></div></div>'

    const input = document.querySelector('.input');
    const button = document.querySelector('.button');
    const inform = document.querySelector('.inform');

    const validator = new Validator(button, input);
    validator.start();

    input.value = number;
    button.click();
    
    expect(inform.classList.contains(color)).toEqual(expected);
})