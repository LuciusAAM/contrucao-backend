const express = require('express');
const logger = require('morgan');
const apidocsRouter = require('./routes/apidocsRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota da documentação
app.use('/api-docs', apidocsRouter);

// Rota simples de teste
app.get('/', (req, res) => {
  res.json({ message: 'API rodando com sucesso 🚀' });
});

module.exports = app;
