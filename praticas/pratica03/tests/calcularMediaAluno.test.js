const { calcularMediaAluno } = require("../src/calcularMediaAluno");

test("deve lançar erro se a1 for negativo", () => {
  expect(() => calcularMediaAluno(-1, 2, 3)).toThrow(
    "Notas a1 ou a2 não podem ser negativas"
  );
});

test("deve lançar erro se a2 for negativo", () => {
  expect(() => calcularMediaAluno(1, -2, 3)).toThrow(
    "Notas a1 ou a2 não podem ser negativas"
  );
});

// 5. e)
test("deve calcular a média de a1 e a2 quando a3 não é informada", () => {
  const media = calcularMediaAluno(5, 5);
  expect(media).toBeCloseTo(5.0);
});

test("deve lançar erro se a3 for negativa", () => {
  expect(() => calcularMediaAluno(1, 2, -3)).toThrow(
    "Nota a3 não pode ser negativa"
  );
});

test("deve calcular a média correta quando a melhor combinação é a1 e a3", () => {
  const media = calcularMediaAluno(9, 5, 8);

  expect(media).toBeCloseTo(8.5);
});

test("deve calcular a média correta quando a melhor combinação é a2 e a3", () => {
  const media = calcularMediaAluno(4, 9, 8);
  expect(media).toBeCloseTo(8.5);
});
