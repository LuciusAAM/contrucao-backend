const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nome: String,
  concluida: Boolean,
});

module.exports = new mongoose.model("Tarefa", schema);
