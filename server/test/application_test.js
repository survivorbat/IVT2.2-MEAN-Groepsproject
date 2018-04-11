const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let testID
chai.use(chaiHttp)

describe('Basic application tests', () => {
    it('should fail to GET basic page', function(done){
        chai.request(server)
        .get('/api/chatmessages')
        .end(function (err, res){
            res.should.have.status(401);
            done();
        })
    })
    it('should login', function(done){
        chai.request(server)
            .post('/api/token')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'asdf', password: 'asdf'})
            .end(function (err, res){
                res.should.have.status(201);
                res.body.should.have.property('token');
                token = res.body.token;
                console.log(token);
                done();
        })
    })
    it('should GET basic page', function(done){
        chai.request(server)
        .get('/api/chatmessages')
        .set('Authorization', 'bearer ' + token)
        .end(function (err, res){
            res.should.have.status(200);
            done();
        })
    })
})