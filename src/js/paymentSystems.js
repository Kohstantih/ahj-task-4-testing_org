const numbersMastercard = [51, 52, 53, 54, 55];
for (let i = 2221; i <= 2720; i += 1) {
  numbersMastercard.push(i);
}
const numbersJsb = [];
for (let i = 3528; i <= 3589; i += 1) {
  numbersJsb.push(i);
}

const paymentSystems = [
  {
    name: 'visa',
    numbers: [4],
  },
  {
    name: 'mastercard',
    numbers: numbersMastercard,
  },
  {
    name: 'mir',
    numbers: [2200, 2201, 2202, 2203, 2204],
  },
  {
    name: 'american-express',
    numbers: [34, 37],
  },
  {
    name: 'discover',
    numbers: [65, 6011, 644, 645, 646, 647, 648, 649],
  },
  {
    name: 'jsb',
    numbers: numbersJsb,
  },
];

export default paymentSystems;
