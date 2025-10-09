const Tarefa = require('./modelo');

// b, c, d, e
async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);
  await tarefa.inserir();
}

// f, g, h
async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  return await tarefa.buscar();
}

// i, j, k, l
async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.buscar();

  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;
    await tarefa.alterar();
  } else {
    console.log('Tarefa não encontrada para atualizar.');
  }
}

// m, n, o
async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.buscar();

  if (tarefa.id) {
    await tarefa.deletar();
  } else {
    console.log('Tarefa não encontrada para remover.');
  }
}

// p
module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};