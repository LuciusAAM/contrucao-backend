function calcularMediaAluno(a1, a2, a3) {
  // 5.b)
  if (a1 === undefined || a2 === undefined) {
    throw new Error("Notas a1 ou a2 não informadas");
  }
  // 5. d)
  if (a1 < 0 || a2 < 0) {
    throw new Error("Notas a1 ou a2 não podem ser negativas");
  }
  if (a3 < 0) {
    throw new Error("Nota a3 não pode ser negativa");
  }
  //   5. e)
  if (a3 === undefined) {
    return a1 * 0.4 + a2 * 0.6;
  }


  return Math.max(
    (a1 + a2) / 2,
    (a1 + a3) / 2,
    (a2 + a3) / 2
  );
}

module.exports = { calcularMediaAluno };
