const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let testID
let APIKEY

chai.use(chaiHttp)
describe('Film API interface', () => {
	it('should GET /api/films/ correctly', done => {
        chai.request(server)
            .get('/api/films')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
    it('should GET /api/films/5a840365909c6a1430edb871 incorrectly', done => {
        chai.request(server)
            .get('/api/films/5a840365909c6a1430edb871')
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should GET /api/films/wololo incorrectly', done => {
        chai.request(server)
            .get('/api/films/wololo')
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should POST /api/token correctly', done => {
        chai.request(server)
            .post('/api/token')
            .send({email:process.env.TESTUSER_EMAIL,password:process.env.TESTUSER_PASS})
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                APIKEY=res.body.token
                res.body.authlevel.should.equal(1)
                done()
            })
    })
    it('should POST /api/films correctly', done => {
        chai.request(server)
            .post('/api/films')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"title":"test","subtitle":"test","description":"testtesttestestsetsetsetsetsetsetetsetsettestsetestse","popularity":1,"duration":10,"year":2013,"coverPicture":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjI2MDMxODAyMl5BMl5BanBnXkFtZTgwNjI1NTIzMzI@._V1_SY1000_CR0,0,674,1000_AL_.jpg","stars":"test, test, test","directors":"test, test, test","writers":"test, test, test","genre":"Horror"})
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.message.should.equal("succes")
                testID=res.body.createdObject._id
                done()
            })
    })
    it('should POST /api/films incorrectly', done => {
        chai.request(server)
            .post('/api/films')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer '+APIKEY)
            .send({"subtitle":"test","description":"testtesttestestsetsetsetsetsetsetetsetsettestsetestse","popularity":1,"duration":10,"year":2013,"coverPicture":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjI2MDMxODAyMl5BMl5BanBnXkFtZTgwNjI1NTIzMzI@._V1_SY1000_CR0,0,674,1000_AL_.jpg","stars":"test, test, test","directors":"test, test, test","writers":"test, test, test","genre":"Horror"})
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')
                done()
            })
    })
    it('should DELETE /api/films correctly', done => {
		chai.request(server)
			.delete('/api/films/'+testID)
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})
	it('should DELETE /api/films incorrectly with missing value', done => {
		chai.request(server)
			.delete('/api/films/ddd')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+APIKEY)
			.end((err, res) => {
				res.should.have.status(422)
				done()
			})
	})
})