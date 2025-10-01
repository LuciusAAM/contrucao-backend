const tarefaModel = require("../models/tarefaModel");

function listar(req, res) {
  const resultado = tarefaModel.listar();
  return res.json(resultado);
}

function buscarPeloId(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.buscarPeloId(tarefaId);
  if (resultado) {
    return res.json(resultado);
  }
  return res.status(404).json({ msg: "Tarefa não encontrada" });
}

function criar(req, res) {
  const resultado = tarefaModel.criar(req.body);
  return res.status(201).json(resultado);
}

function atualizar(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.atualizar({ id: tarefaId, ...req.body });
  if (resultado) {
    return res.json(resultado);
  }
  return res.status(404).json({ msg: "Tarefa não encontrada" });
}

function remover(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.remover(tarefaId);
  if (resultado) {
    return res.status(204).end();
  }
  return res.status(404).json({ msg: "Tarefa não encontrada" });
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };