import CheckPaymentSystem from './CheckPaymentSystem';
import Validator from './Validator';
import paymentSystems from './paymentSystems';

const input = document.querySelector('.input');

const checker = new CheckPaymentSystem(input, paymentSystems);
checker.start();

const button = document.querySelector('.button');

const validator = new Validator(button, input);
validator.start();
