const calculator = require("../src/calculator.js");

test("2 + 2 = 4?", function () {
  expect(calculator.soma(2, 2)).toBe(4);
});



test("2 + 0 = 2?", function () {
  expect(calculator.soma(2, 0)).toBe(2);
});



test("-2 + 4 = 2?", function () {
  expect(calculator.soma(-2, 4)).toBe(2);
});


test("2 * 2 = 4?", function () {
    expect(calculator.multip(2, 2)).toBe(4);
  });
  