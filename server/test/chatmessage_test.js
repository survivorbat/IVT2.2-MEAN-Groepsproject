const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let testID
let token

chai.use(chaiHttp)
describe('Chatmessage API interface', () => {
    it('should login', function(done){
        chai.request(server)
            .post('/api/token')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'wouter', password: 'w'})
            .end(function (err, res){
                res.should.have.status(201);
                res.body.should.have.property('token');
                token = res.body.token;
                console.log(token);
                done();
        })
    })
    it('should POST /api/chatmessages correctly', done => {
        chai.request(server)
            .post('/api/chatmessages')
            .set('Authorization', 'bearer ' + token)
            .send({title:'TESTMESSAGEDONOTREPLICATE',by:'asdf', chatbox: 97, text:'TESTMESSAGEDONOTREPLICATE'})
            .end((err, res) => {
                res.should.have.status(201)
                done()
            })
    })
    it('should POST /api/chatmessages incorrectly', done => {
        chai.request(server)
            .post('/api/chatmessages')
            .set('Authorization', 'bearer ' + token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({title:'TESTMESSAGEDONOTREPLICATE'})
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should GET /api/chatmessages correctly', done => {
        chai.request(server)
            .get('/api/chatmessages/chatbox/97')
            .set('Authorization', 'bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                testID = res.body.filter(item => item.text === 'TESTMESSAGEDONOTREPLICATE')[0].id
                done()
            })
    })
    it('should DELETE /api/chatmessages correctly', done => {
		chai.request(server)
			.delete('/api/chatmessages/'+testID)
            .set('Authorization', 'bearer ' + token)
			.set('content-type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})
})