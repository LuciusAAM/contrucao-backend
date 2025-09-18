import { soma, divisao } from './index.js';

if (soma(1, 1) === 2) console.log("Passou 1º!");
else console.error("Deu ruim 1º!");

if (soma(1, 0) === 1) console.log("Passou 2º!");
else console.error("Deu ruim 2º!");

if (soma(1, -1) === 0) console.log("Passou 3º!");
else console.error("Deu ruim 3º!");

if (divisao(1, 1) === 1) console.log("Passou 4º!");
else console.error("Deu ruim 4º!");

if (divisao(6, 3) === 2) console.log("Passou 5º!");
else console.error("Deu ruim 5º!");

if (divisao(1, 0) === undefined) console.log("Passou 6º!");
else console.error("Deu ruim 6º!");

