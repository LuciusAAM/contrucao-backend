const { MongoClient } = require("mongodb");

const url = "mongodb+srv://usrTarefas:12345@cluster0.oxtt5yf.mongodb.net/";

const client = new MongoClient(url);

async function conecta() {
  try {
    await client.connect();
    return client.db("agenda");
  } catch (e) {
    console.log("Erro ao conectar no MongoDB!", e.message);
  }
}

module.exports = conecta;
