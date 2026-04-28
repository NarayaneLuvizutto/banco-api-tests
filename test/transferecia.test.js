const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

describe ('Transferências', () => {
    describe ('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00', async () => {
            const token = await obterToken('julio.lima','123456')
            
            const resposta = await request (process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type','application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 10.00,
                    'token': ""
                })
            expect(resposta.status).to.equal(201);
        })
        it('Deve retornar falha com 422 quando o valor da transferencia for menor que R$ 10,00', async () => {
            const token = await obterToken('julio.lima','123456') 
            
            const resposta = await request (process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type','application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 9.99,
                    'token': ""
                })
            expect(resposta.status).to.equal(422);
        })
    })
})