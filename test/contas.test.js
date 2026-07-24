const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

describe ('Contas', () => {

    //Criando a constante token
    let token 
    //Fazendo o token ser executado à cada teste
    beforeEach(async () => {
            token = await obterToken('julio.lima','123456')
    })

    describe ('GET /contas', () => {
        it('Deve retornar sucesso com 200 e uma lista de contas quando o token for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/contas')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('contas').that.is.an('array');
            expect(resposta.body.contas).to.be.not.empty;
            expect(resposta.body.contas[0]).to.include.keys('id', 'titular', 'saldo', 'ativa');
        })

        it('Deve retornar sucesso com 200 e uma lista paginada quando informar page e limit', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/contas')
                .query({ page: 1, limit: 1 })
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('contas').that.is.an('array');
            expect(resposta.body.contas).to.be.not.empty;
            expect(resposta.body.contas[0]).to.include.keys('id', 'titular', 'saldo', 'ativa');
        })

        it('Deve retornar falha com 401 quando o token for inválido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/contas')
                .set('Authorization', 'Bearer token-invalido')

            expect(resposta.status).to.equal(401);
            expect(resposta.body.error).to.equal('Token inválido.');
        })
    })
})