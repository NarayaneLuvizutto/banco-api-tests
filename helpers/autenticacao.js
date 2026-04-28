const request = require('supertest');

const obterToken = async (usuario, senha) =>{
    //Capturar o token passando parametros
        const respostaLogin = await request (process.env.BASE_URL)
            .post('/login')
            .set('Content-Type','application/json')
                .send({
                'username': usuario,
                'senha': senha
            })
        //Retornando resultado da autenticação
        return respostaLogin.body.token  
}

// Exportando a função para ficar visivel no projeto
module.exports = {
    obterToken
}