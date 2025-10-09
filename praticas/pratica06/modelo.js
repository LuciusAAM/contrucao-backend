const conectarDb = require("./database");

class Tarefa {
  constructor(nome, concluida) {
    this.nome = nome;
    this.concluida = concluida;
    this.id = null;

    this.inicializar();
  }

  async inicializar() {
    this.db = await conectarDb();
    this.collection = this.db.collection("tarefas");
  }

  async inserir() {
    // Garante que a conexão foi feita antes de inserir
    if (!this.collection) {
      await this.inicializar();
    }

    // (m) Insere a tarefa no banco
    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });

    // (n) Armazena o ID gerado no MongoDB
    this.id = resultado.insertedId;

    console.log("Tarefa inserida com sucesso! ID:", this.id);
  }

  async alterar() {
    if (!this.collection) {
      await this.inicializar();
    }

    if (!this.id) {
      console.log("A tarefa ainda não foi inserida no banco.");
      return;
    }

    const resultado = await this.collection.updateOne(
      { _id: new ObjectId(this.id) },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );

    if (resultado.modifiedCount > 0) {
      console.log("Tarefa atualizada com sucesso!");
    } else {
      console.log("Nenhuma tarefa foi alterada (verifique o ID).");
    }
  }

  async deletar() {
    if (!this.collection) {
      await this.inicializar();
    }

    const resultado = await this.collection.deleteOne({ nome: this.nome });

    if (resultado.deletedCount > 0) {
      console.log("Tarefa deletada com sucesso!");
    } else {
      console.log("Nenhuma tarefa encontrada para deletar.");
    }
  }

  async buscar() {
    if (!this.collection) {
      await this.inicializar();
    }

    const resultado = await this.collection.findOne({ nome: this.nome });

    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
      console.log("Tarefa encontrada:", resultado);
    } else {
      console.log("Tarefa não encontrada.");
    }
  }
}

module.exports = Tarefa;
