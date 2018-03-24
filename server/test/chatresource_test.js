const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let testID

chai.use(chaiHttp)
describe('Chatresource API interface', () => {
	it('should POST /api/chatresources correctly', done => {
        chai.request(server)
            .post('/api/chatresources')
            .send({title:'TEST',description:'TESTRESOURCE',message:'testmessage', url:'http://test.com'})
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should POST /api/chatresources incorrectly', done => {
        chai.request(server)
            .post('/api/chatresources')
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
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
    it('should DELETE /api/chatresources correctly', done => {
		chai.request(server)
			.delete('/api/chatresources/TEST')
			.set('content-type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})
})