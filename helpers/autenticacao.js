const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json')

const obterToken = async (usuario, senha) =>{
        const bodyLogin = { ...postLogin}   
        //Capturar o token passando parametros
        const respostaLogin = await request (process.env.BASE_URL)
            .post('/login')
            .set('Content-Type','application/json')
            .send(bodyLogin)
        //Retornando resultado da autenticação
        return respostaLogin.body.token  
}

// Exportando a função para ficar visivel no projeto
module.exports = {
    obterToken
}