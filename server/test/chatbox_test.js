const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let testID

chai.use(chaiHttp)
describe('Chatbox API interface', () => {
    it('should POST /api/chatboxes correctly', done => {
        chai.request(server)
            .post('/api/chatboxes')
            .send({name:'TEST',maxPeople:10})
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                console.log(res)
                done()
            })
    })
    it('should POST /api/chatboxes incorrectly', done => {
        chai.request(server)
            .post('/api/chatboxes')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({maxPeople:10})
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')
                done()
            })
    })
	it('should GET /api/chatboxes/ correctly', done => {
        chai.request(server)
            .get('/api/chatboxes')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                testID = res.body.filter(item => item.Name === 'TEST')[0]
                done()
            })
    })
    it('should GET /api/chatboxes/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/chatboxes/5a840365909c6a1430edb871')
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should GET /api/chatboxes/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/chatboxes/wololo')
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should DELETE /api/chatboxes correctly', done => {
		chai.request(server)
			.delete('/api/chatboxes/'+testID)
			.set('content-type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})
	it('should DELETE /api/chatboxes incorrectly with missing value', done => {
		chai.request(server)
			.delete('/api/chatboxes/ddd')
			.set('content-type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(422)
				done()
			})
	})
})