const express = require("express");

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true },
];

const app = express();

// Utilize o middleware integrado "express.json()" para processar o corpo das requisições JSON.
app.use(express.json());

app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  next(); // passa a requisição para o próximo middleware ou rota
});





// Criando o roteador de tarefas
const routerTarefas = express.Router();

// GET /tarefas → lista todas as tarefas
routerTarefas.get("/", (req, res) => {
  res.json(tarefas);
});

// POST /tarefas → cria nova tarefa
routerTarefas.post("/", (req, res) => {
    const novaTarefa = {
        id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
        nome: req.body.nome,
        concluida: false
      };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});



// GET /tarefas/:tarefaId → busca tarefa por id
routerTarefas.get("/:tarefaId", (req, res, next) => {
    const id = parseInt(req.params.tarefaId);
    const tarefa = tarefas.find(t => t.id === id);
  
    if (!tarefa) {
      return next(new Error("Tarefa não localizada"));
    }
  
    res.json(tarefa);
  });
  

// PUT /tarefas/:tarefaId → atualiza tarefa por id
routerTarefas.put("/:tarefaId", (req, res, next) => {
    const id = parseInt(req.params.tarefaId);
    const tarefa = tarefas.find(t => t.id === id);
  
    if (!tarefa) {
      return next(new Error("Tarefa não localizada"));
    }
  
    tarefa.nome = req.body.nome ?? tarefa.nome;
    tarefa.concluida = req.body.concluida ?? tarefa.concluida;
  
    res.json(tarefa);
  });

// DELETE /tarefas/:tarefaId → remove tarefa por id
routerTarefas.delete("/:tarefaId", (req, res, next) => {
    const id = parseInt(req.params.tarefaId);
    const index = tarefas.findIndex(t => t.id === id);
  
    if (index === -1) {
      return next(new Error("Tarefa não localizada"));
    }
  
    tarefas.splice(index, 1);
    res.status(204).send();
  });




// Vinculando o roteador ao caminho /tarefas
app.use("/tarefas", routerTarefas);

// Middleware de erro (deve ser o último)
app.use((err, req, res, next) => {
    console.error("Erro capturado:", err.message);
    res.status(400).json({ erro: err.message });
  });




app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
