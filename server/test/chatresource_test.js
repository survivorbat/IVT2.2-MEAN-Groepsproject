const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let testID
let token

chai.use(chaiHttp)
describe('Chatresource API interface', () => {
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
    
    it('should POST /api/chatmessages correctly', done => {
        chai.request(server)
            .post('/api/chatmessages')
            .set('Authorization', 'bearer ' + token)
            .send({title:'testMessageResource',by:'asdf', chatbox: 97, text:'testMessageResource'})
            .end((err, res) => {
                res.should.have.status(201)
                testID = res.body[0].id /* Note that we always assume the id to be first */
                done()
            })
    })
    
	it('should POST /api/chatresources correctly', done => {
        chai.request(server)
            .post('/api/chatresources')
            .set('Authorization', 'bearer ' + token)
            .send({title:'TEST',description:'TESTRESOURCE',message:testID, url:'http://test.com'})
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should POST /api/chatresources incorrectly', done => {
        chai.request(server)
            .post('/api/chatresources')
            .set('Authorization', 'bearer ' + token)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({title:'TEST',description:'TESTRESOURCE'})
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')
                done()
            })
    })
	it('should GET /api/chatresources/ correctly', done => {
        chai.request(server)
            .get('/api/chatresources')
                .set('Authorization', 'bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
    it('should DELETE /api/chatresources correctly', done => {
		chai.request(server)
			.delete('/api/chatresources/TEST')
            .set('Authorization', 'bearer ' + token)
			.set('content-type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})
    it('should CLEANUP after testing', done => {
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
