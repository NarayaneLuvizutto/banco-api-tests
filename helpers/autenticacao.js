const request = require('supertest');

const obterToken = async (usuario, senha) =>{
    //Capturar o token
        const respostaLogin = await request (process.env.BASE_URL)
            .post('/login')
            .set('Content-Type','application/json')
                .send({
                'username': usuario,
                'senha': senha
            })
        //Resultado da autenticação
        return respostaLogin.body.token  
}

module.exports = {
    obterToken
}