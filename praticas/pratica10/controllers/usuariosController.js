const {
  cifrarSenha,
  compararSenha,
  gerarToken,
} = require("../middlewares/authMiddleware");
const Usuario = require("../models/usuariosModel");

// CRIAR USUARIO
async function criar(req, res) {
  try {
    if (!req.body || !req.body.email || !req.body.senha) {
      throw new Error("Dados faltando");
    }
    const senhaCifrada = cifrarSenha(req.body.senha);

    const novoUsuario = await Usuario.create({
      email: req.body.email,
      senha: senhaCifrada,
    });

    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email,
    });
  } catch (e) {
    return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
  }
}

// LOGIN
async function entrar(req, res) {
  try {
    if (!req.body || !req.body.usuario || !req.body.senha) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const usuarioEncontrado = await Usuario.findOne({
      email: req.body.usuario,
    });

    if (
      usuarioEncontrado &&
      compararSenha(req.body.senha, usuarioEncontrado.senha)
    ) {
      const token = gerarToken({ email: req.body.usuario });
      return res.status(200).json({ token });
    }

    return res.status(401).json({ msg: "Credenciais inválidas" });
  } catch (e) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }
}

// RENOVAR TOKEN
async function renovar(req, res) {
  // req.usuario deve ser o email (string) definido pelo middleware
  const token = gerarToken({ email: req.usuario });
  return res.status(200).json({ token });
}


async function remover(req, res) {
  const email = req.body.usuario;

  await Usuario.findOneAndDelete({ email });

  return res.status(204).send();
}


module.exports = {
  criar,
  entrar,
  renovar,
  remover,
};
