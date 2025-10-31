const express = require('express');
const router = express.Router();
const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario && senha) {
    const token = gerarToken(usuario);
    return res.status(200).json({ token });
  }
  return res.status(400).json({ msg: 'Usuário ou senha inválidos' });
});

router.post('/renovar', verificarToken, (req, res) => {
  const novoToken = gerarToken(req.usuario.email);
  return res.status(200).json({ token: novoToken });
});

module.exports = router;