const request = require('supertest');
const app = require('../app');

let token = '';

describe('Testes da API REST', () => {

  test('GET /produtos sem token → 401 Não autorizado', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe('Não autorizado');
  });

  test('GET /produtos com token inválido → 401 Token inválido', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', '123456789');
    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe('Token inválido');
  });

  test('POST /usuarios/login retorna token válido', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
  });

  test('GET /produtos com token válido → 200', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', token);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /usuarios/renovar gera novo token', async () => {
    const res = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
  });

  test('GET /produtos com novo token → 200', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', token);

    expect(res.statusCode).toBe(200);
  });
});