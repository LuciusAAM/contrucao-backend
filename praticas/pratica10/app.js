require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const yaml = require("yaml");
const swaggerUI = require("swagger-ui-express");

const apidocsRouter = require("./routes/apidocsRouter");
const usuariosRouter = require("./routes/usuariosRouter");

const app = express();

// JSON middleware
app.use(express.json());

// Swagger
const swaggerFile = fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf8");
const swaggerDoc = yaml.parse(swaggerFile);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Conexão MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

// Rotas
app.use("/usuarios", usuariosRouter);
app.use("/api-docs", apidocsRouter);

module.exports = app;
