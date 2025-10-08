const request = require("supertest");
const app = require("../app");

let tarefaId;

describe("Testes da API de Tarefas", () => {
  it("GET /tarefas deve retornar 200 e JSON", async () => {
    const res = await request(app).get("/tarefas");
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
  });

  it("POST /tarefas deve criar tarefa", async () => {
    const res = await request(app)
      .post("/tarefas")
      .send({ nome: "Estudar Node", concluida: false });
    expect(res.status).toBe(201);
    expect(res.type).toMatch(/json/);
    tarefaId = res.body.id; // salva o id para próximos testes
  });

  it("GET /tarefas/:id deve retornar 200", async () => {
    const res = await request(app).get(`/tarefas/${tarefaId}`);
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
  });

  it("GET /tarefas/1 deve retornar 404", async () => {
    const res = await request(app).get("/tarefas/1");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ msg: "Tarefa não encontrada" });
  });

  it("PUT /tarefas/:id deve atualizar tarefa", async () => {
    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: "Estudar Node e Express", concluida: true });
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
  });

  it("PUT /tarefas/1 deve retornar 404", async () => {
    const res = await request(app).put("/tarefas/1");
    expect(res.status).toBe(404);
  });

  it("DELETE /tarefas/:id deve remover tarefa", async () => {
    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.status).toBe(204);
  });

  it("DELETE /tarefas/1 deve retornar 404", async () => {
    const res = await request(app).delete("/tarefas/1");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ msg: "Tarefa não encontrada" });
  });
});