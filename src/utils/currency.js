import currencyJs from "currency.js";

const currency = (number, options = {}) =>
  currencyJs(number, {
    separator: ",",
    precision: 2,
    symbol: "$",
    decimal: ".",
    ...options,
  }).format();

export default currency;
