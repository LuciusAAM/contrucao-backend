// importa o framework
const express = require("express");

// cria uma instância da aplicação
const app = express();

// middleware de aplicação
app.use((req, res, next) => {
  console.log("eu so queria jogar silksong");
  next();
});

// middleware de rota
const router = express.Router();

router.get("/", (req, res) => {
  res.send("oia eu aqui");
});

router.post("/", (req, res) => {
  res.status(201).send("acaba logo pfvr");
});

router.get("/:id", (req, res) => {
  const { id } = req.params; // id: 1, param2 = 5, param3 = 6
  if (id == 1) return res.send("Achei");

  throw Error("Não achei");
});

app.use("/tarefas", router);


// middleware
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("é cilada bino")
})

// inicia a aplicação
app.listen(3000, () => {
  console.log("Olá mundo!");
});
