require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const produtosRouter = require("./routes/produtosRouter");

const app = express();
app.use(express.json());

// Conexão MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

// Rotas
app.use("/produtos", produtosRouter);

module.exports = app;