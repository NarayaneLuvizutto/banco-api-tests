const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require ('../fixtures/postTransferencias.json')

describe ('Transferências', () => {

    //Criando a constante token
    let token 
    //Fazendo o token ser executado à cada teste
    beforeEach(async () => {
            token = await obterToken('julio.lima','123456')
    })

    describe ('POST /transferencias', () => {
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

    describe ('GET /transferencias/{id}', () => {
        it ('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contido no banco de dados quando o ID for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/2')
                .set('Authorization', `Bearer ${token}`)
            
                console.log(resposta.status)
                console.log(resposta.body)
                expect(resposta.status).to.equal(200)
                expect(resposta.body.id).to.equal(2)
                expect(resposta.body.id).to.be.a('number')
                expect(resposta.body.conta_origem_id).to.equal(1)
                expect(resposta.body.conta_destino_id).to.equal(2)
                expect(resposta.body.valor).to.equal('11.00')
        })
    })
})