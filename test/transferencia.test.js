const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require ('../fixtures/postTransferencias.json')

describe ('Transferências', () => {
    describe ('POST /transferencias', () => {
        //Criando a constante token
        let token 
        //Fazendo o token ser executado à cada teste
        beforeEach(async () => {
            token = await obterToken('julio.lima','123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10,00', async () => {
            //Código que utiliza o json de transferencias de outro arquivo
            const bodyTransferencias = { ...postTransferencias}
            
            const resposta = await request (process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type','application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(201);
        })
        it('Deve retornar falha com 422 quando o valor da transferencia for menor que R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias}
            bodyTransferencias.valor = 9.99

            const resposta = await request (process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type','application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(422);
        })
    })
})