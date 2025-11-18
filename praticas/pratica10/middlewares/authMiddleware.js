const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Aceita "Bearer token" OU "token"
function extrairToken(header) {
  if (!header) return null;

  if (header.startsWith("Bearer ")) {
    return header.substring(7);
  }

  return header; // caso venha só o token
}

function verificarToken(req, res, next) {
  try {
    const rawHeader =
      req.headers["authorization"] ||
      req.headers["Authorization"] ||
      req.headers["AUTHORIZATION"];

    const token = extrairToken(rawHeader);

    if (!token) {
      return res.status(401).json({ msg: "Token invalido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded.email; 
    return next();
  } catch (e) {
    return res.status(401).json({ msg: "Token invalido" });
  }
}

function gerarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "60s",
  });
}


function cifrarSenha(senha) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(senha, salt);
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}

module.exports = {
  verificarToken,
  gerarToken,
  cifrarSenha,
  compararSenha,
};
