const app =  require('../src/index.js');

const assert = require('assert');
const chaiLib = require('chai')
const chaiLibHttp = require('chai-http');
const chaiLibJson = require('chai-json-schema');

chaiLib.use(chaiLibHttp);
chaiLib.use(chaiLibJson);

const expect = chaiLib.expect;

//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = {
    title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
    type: "object",
    required: ['nome', 'email', 'idade'],
    properties: {
        nome: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        idade: {
            type: 'number',
            minimum: 18
        }
    }
}

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chaiLib
describe('Um simples conjunto de testes', function () {
    it('deveria retornar -1 quando o valor não esta presente', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});

//testes da aplicação
describe('Testes da aplicaçao',  () => {
    it('o servidor esta online', function (done) {
        chaiLib.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chaiLib.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.eql([]);
        done();
        });
    });

    it('deveria criar o usuario raupp', function (done) {
        chaiLib.request(app)
        .post('/users')
        .send({nome: "raupp", email: "jose.raupp@devoz.com.br", idade: 35})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        });
    });
    //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

    it('o usuario naoExiste não existe no sistema', function (done) {
        chaiLib.request(app)
        .get('/user/naoExiste')
        .end(function (err, res) {
            expect(err.response.body.error).to.be.equal('User not found'); //possivelmente forma errada de verificar a mensagem de erro
            expect(res).to.have.status(404);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('o usuario raupp existe e é valido', function (done) {
        chaiLib.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('deveria excluir o usuario raupp', function (done) {
        chaiLib.request(app)
        .delete('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('o usuario raupp não deve existir mais no sistema', function (done) {
        chaiLib.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('deveria ser uma lista com pelomenos 5 usuarios', function (done) {
        chaiLib.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.total).to.be.at.least(5);
        done();
        });
    });
})