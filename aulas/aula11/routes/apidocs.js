const express = require("express");
const YAML = require("yaml");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");

// carregar o arquivo swagger.yaml
const file = fs.readFileSync("./swagger.yaml", "utf8");

// valida o formato YAML
const swaggerDoc = YAML.parse(file);


// middleware de rota
const router = express.Router();

router.use("/", swaggerUi.serve)


router.get("/", swaggerUi.setup(swaggerDoc))









module.exports = router;
