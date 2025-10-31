const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ msg: 'Não autorizado' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

function gerarToken(payload) {
  const expiresIn = 120; // 2 minutos
  try {
    return jwt.sign({ email: payload }, process.env.JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new Error('Erro ao gerar o token');
  }
}

module.exports = { verificarToken, gerarToken };