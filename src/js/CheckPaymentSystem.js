export default class CheckPaymentSystem {
  constructor(element, paymentSystems) {
    this.element = element;
    this.paymentSystems = paymentSystems;
    this.check = this.check.bind(this);
  }

  start() {
    this.element.addEventListener('input', this.check);
  }

  check() {
    const result = this.caller(this.element.value);

    CheckPaymentSystem.hiding(result);
  }

  caller(value) {
    for (let i = 0; i < this.paymentSystems.length; i += 1) {
      for (let j = 0; j < this.paymentSystems[i].numbers.length; j += 1) {
        if (value.startsWith(`${this.paymentSystems[i].numbers[j]}`)) {
          return this.paymentSystems[i].name;
        }
      }
    }
    return null;
  }

  static hiding(id) {
    const visible = document.getElementById(`${id}`);
    const curtains = Array.from(document.querySelectorAll('.curtain'));
    curtains.forEach((el) => {
      el.classList.remove('curtain_on');
      if (el.previousElementSibling !== visible && visible !== null) el.classList.add('curtain_on');
    });
  }
}
