export default class Validator {
  constructor(button, input) {
    this.button = button;
    this.input = input;
    this.validation = this.validation.bind(this);
  }

  start() {
    this.button.addEventListener('click', this.validation);
    this.input.addEventListener('input', Validator.hideInform);
  }

  validation(e) {
    e.preventDefault();

    if (this.input.value.length < 13) return Validator.showMessage('Номер слишком короткий', false);
    if (this.input.value.length > 19) return Validator.showMessage('Номер слишком длинный', false);

    const result = Validator.calculation(this.input.value);

    if (result) return Validator.showMessage('Введен действительный номер карты', true);

    return Validator.showMessage('Введен недействительный номер карты', false);
  }

  static calculation(value) {
    const arr = value.split('');
    let sum = 0;

    if (arr.length % 2 === 0) {
      for (let i = arr.length - 1; i >= 0; i -= 1) {
        if (i % 2 !== 0) {
          sum += +arr[i];
        } else {
          let x = +arr[i] * 2;
          if (x > 9) x -= 9;
          sum += x;
        }
      }
    } else {
      for (let i = arr.length - 1; i >= 0; i -= 1) {
        if (i % 2 === 0) {
          sum += +arr[i];
        } else {
          let x = +arr[i] * 2;
          if (x > 9) x -= 9;
          sum += x;
        }
      }
    }

    if (sum % 10 === 0) return true;

    return false;
  }

  static showMessage(text, toggle) {
    const inform = document.querySelector('.inform');
    const color = toggle ? 'valid' : 'fail';
    inform.classList.remove('valid');
    inform.classList.remove('fail');
    inform.classList.add(color);
    inform.textContent = text;
  }

  static hideInform() {
    const inform = document.querySelector('.inform');
    inform.classList.remove('valid');
    inform.classList.remove('fail');
    inform.textContent = '';
  }
}
