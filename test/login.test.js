const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => {
            const bodyLogin = { ...postLogin }

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })

        it('Deve retornar 401 quando usar username e senha inválidos', async () => {
            const bodyLogin = {
                username: 'usuario-invalido',
                senha: 'senha-invalida'
            }

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
            expect(resposta.body.error).to.equal('Usuário ou senha inválidos.');
        })

        it('Deve retornar 401 quando usar username válido e senha inválida', async () => {
            const bodyLogin = {
                username: postLogin.username,
                senha: 'senha-invalida'
            }

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
            expect(resposta.body.error).to.equal('Usuário ou senha inválidos.');
        })

        it('Deve retornar 401 quando usar username e senha inexistentes', async () => {
            const bodyLogin = {
                username: 'nao.existe',
                senha: '000000'
            }

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
            expect(resposta.body.error).to.equal('Usuário ou senha inválidos.');
        })

         it('Deve retornar 400 quando a requisição não enviar username e senha', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({})

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário e senha são obrigatórios.');
        })

        it('Deve retornar 400 quando informar username válido e senha ausente', async () => {
            const bodyLogin = {
                username: postLogin.username
            }

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário e senha são obrigatórios.');
        })

        it('Deve retornar 400 quando informar username ausente e senha preenchida', async () => {
            const bodyLogin = {
                senha: postLogin.senha
            }

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário e senha são obrigatórios.');
        })

        it('Deve retornar 400 quando informar username vazio e senha válida', async () => {
            const bodyLogin = {
                username: '',
                senha: postLogin.senha
            }

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário e senha são obrigatórios.');
        })

        it('Deve retornar 400 quando informar username válido e senha vazia', async () => {
            const bodyLogin = {
                username: postLogin.username,
                senha: ''
            }

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário e senha são obrigatórios.');
        })

        it('Deve retornar 405 quando usar um método diferente de POST', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/login')
                .set('Content-Type', 'application/json')

            expect(resposta.status).to.equal(405);
            expect(resposta.body.error).to.equal('Método não permitido.');
        })
    })
})