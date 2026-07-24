# Banco API Tests

## 📋 Sobre o projeto

O Banco API Tests é um projeto de automação de testes para APIs REST desenvolvido como parte dos estudos realizados durante a Mentoria de Testes de Software 2.0, ministrada por Júlio de Lima.

O objetivo do projeto é demonstrar uma estrutura organizada para automação de testes de APIs utilizando JavaScript, aplicando boas práticas de organização do código, reutilização de componentes, validação de respostas HTTP e geração de relatórios de execução.

## 🎯 Objetivo
* Automatizar testes de uma API REST utilizando JavaScript;
* Demonstrar uma arquitetura organizada para projetos de testes;
* Servir como material de estudo para automação de testes de API;
* Gerar relatórios de execução em HTML.

## 🔗 Projetos relacionados

API: https://github.com/juliodelimas/banco-api  
Automação: https://github.com/NarayaneLuvizutto/banco-api-tests

## 🚀 Stack
JavaScript
Node.js
Mocha
Supertest
Chai
Mochawesome
Dotenv

## 📁 Estrutura
```text
banco-api-tests
├── mochawesome/
├── src/
│   ├── fixtures/
│   ├── helpers/
│   ├── requests/
│   ├── schemas/
│   ├── tests/
│   └── utils/
├── .env
├── package.json
└── README.md
```

## ⚙️ Instalação
```bash
git clone https://github.com/NarayaneLuvizutto/banco-api-tests.git
cd banco-api-tests
npm install
```

## 🔐 Arquivo .env
Crie um arquivo `.env` na raiz:
```env
BASE_URL=http://localhost:3000
```

## ▶️ Execução
```bash
npm test
```
Ou utilize os scripts disponíveis no `package.json`.

## 📊 Relatórios
O Mochawesome gera relatórios HTML automaticamente no diretório:
```text
mochawesome/
```
## 📚 Documentação
Mocha: https://mochajs.org/  
Supertest: https://github.com/ladjs/supertest  
Chai: https://www.chaijs.com/  
Mochawesome: https://github.com/adamgruber/mochawesome  
Dotenv: https://github.com/motdotla/dotenv  
