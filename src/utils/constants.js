// Note: Not ES6 Symbols
const ADD_SYMBOL = "+";
const MINUS_SYMBOL = "-";
const MULTIPLY_SYMBOL = "*";
const DIVIDE_SYMBOL = "/";
const DECIMAL_SYMBOL = ".";
const EQUAL_SYMBOL = "=";

const ORDER_OF_OPERATIONS = [[MULTIPLY_SYMBOL, DIVIDE_SYMBOL], [ADD_SYMBOL, MINUS_SYMBOL]];

const CALC_OPER = {
  [ADD_SYMBOL]:      (a, b) => Number(a) + Number(b),
  [MINUS_SYMBOL]:    (a, b) => Number(a) - Number(b),
  [MULTIPLY_SYMBOL]: (a, b) => Number(a) * Number(b),
  [DIVIDE_SYMBOL]:   (a, b) => Number(a) / Number(b)
};

export {
  ADD_SYMBOL,
  MINUS_SYMBOL,
  MULTIPLY_SYMBOL,
  DIVIDE_SYMBOL,
  DECIMAL_SYMBOL,
  EQUAL_SYMBOL,
  ORDER_OF_OPERATIONS,
  CALC_OPER
}
