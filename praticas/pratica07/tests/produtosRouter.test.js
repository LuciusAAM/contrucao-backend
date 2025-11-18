const supertest = require("supertest");
const app = require("../app.js");

const request = supertest(app);

let produtoId;

describe("Testes da API /produtos", () => {
  // POST válido
  test("POST /produtos deve criar produto", async () => {
    const response = await request.post("/produtos").send({
      nome: "Laranja",
      preco: 10.0,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.nome).toBe("Laranja");
    expect(response.body.preco).toBe(10.0);

    produtoId = response.body._id;
  });

  // POST inválido
  test("POST /produtos sem JSON deve retornar erro", async () => {
    const response = await request.post("/produtos").send({});

    expect(response.status).toBe(422);
    expect(response.body.msg).toBe(
      "Nome e preço do produto são obrigatórios"
    );
  });

  // GET geral
  test("GET /produtos deve listar produtos", async () => {
    const response = await request.get("/produtos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // GET válido por ID
  test("GET /produtos/:id deve retornar produto", async () => {
    const response = await request.get(`/produtos/${produtoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
  });

  // GET parâmetro inválido
  test("GET /produtos/0 deve retornar erro", async () => {
    const response = await request.get("/produtos/0");

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  // GET não encontrado
  test("GET /produtos/000... deve retornar 404", async () => {
    const response = await request.get(
      "/produtos/000000000000000000000000"
    );

    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Produto não encontrado");
  });

  // PUT válido
  test("PUT /produtos/:id deve atualizar produto", async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({
      nome: "Laranja Pera",
      preco: 18.0,
    });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Laranja Pera");
    expect(response.body.preco).toBe(18.0);
  });

  // PUT sem JSON
  test("PUT /produtos/:id sem JSON deve retornar erro", async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({});

    expect(response.status).toBe(422);
    expect(response.body.msg).toBe(
      "Nome e preço do produto são obrigatórios"
    );
  });

  // PUT inválido
  test("PUT /produtos/0 deve retornar erro", async () => {
    const response = await request.put("/produtos/0");

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  // PUT não encontrado
  test("PUT /produtos/000... deve retornar 404", async () => {
    const response = await request.put(
      "/produtos/000000000000000000000000"
    ).send({
      nome: "Teste",
      preco: 10
    });

    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Produto não encontrado");
  });

  // DELETE válido
  test("DELETE /produtos/:id deve remover produto", async () => {
    const response = await request.delete(`/produtos/${produtoId}`);

    expect(response.status).toBe(204);
  });

  // DELETE inválido
  test("DELETE /produtos/0 deve retornar erro", async () => {
    const response = await request.delete("/produtos/0");

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  // DELETE não encontrado
  test("DELETE /produtos/000... deve retornar 404", async () => {
    const response = await request.delete(
      "/produtos/000000000000000000000000"
    );

    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Produto não encontrado");
  });
});
