const express = require("express");
const tarefaRouter = require("./routes/tarefaRouter");

const app = express();

app.use(express.json());
app.use("/tarefas", tarefaRouter);

module.exports = app;