const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let token
let username = "testUsor"
let pwd = "secretPWD"
let TestUserID

chai.use(chaiHttp)
describe('User API interface', () => {
    // it('should create user', function(done){
    //     chai.request(server)
    //         .post('/api/users')
    //         .set('content-type', 'application/x-www-form-urlencoded')
    //         .send({username: username, password: pwd})
    //         .end(function(err, res){
    //             res.should.have.status(201)
    //             console.log(res.body)
    //             done()
    //         })
    // })
    // it('should fail to post same user', function(done){
    //     chai.request(server)
    //         .post('/api/users')
    //         .set('content-type', 'application/x-www-form-urlencoded')
    //         .send({username: username, password: pwd})
    //         .end(function(err, res){
    //             res.should.have.status(409)
    //             done()
    //         })
    // })
 
    // it('should login with created user', function(done){
    //     chai.request(server)
    //         .post('/api/token')
    //         .set('content-type', 'application/x-www-form-urlencoded')
    //         .send({username: username, password: pwd})
    //         .end(function (err, res){
    //             res.should.have.status(201);
    //             res.body.should.have.property('token');
    //             token = res.body.token;
    //             done();
    //     })
    // })
    it('should GET specific user', function(done){
        chai.request(server)
            .get('/api/users/me')
            .set('Authorization', 'bearer ' + token)
            .end(function(err, res){
                res.should.have.status(200)
                res.body.should.be.a('object')
                TestUserID = res.body.id
                done()
        })
    })
    it('should GET all users', function(done){
        chai.request(server)
            .get('/api/users')
            .set('Authorization', 'bearer ' + token)
            .end(function(err, res){
                res.should.have.status(200)
                //Check if our test user exists
                res.body.should.be.a('array')
                res.text.should.contain(username)
                done()
        })
    })
    // it('should DELETE test user', function(done){
    //     chai.request(server)
	// 		.delete('/api/users/'+ TestUserID)
    //         .set('Authorization', 'bearer ' + token)
    //         .end(function (err, res){
    //             res.should.have.status(204);
    //             console.log(res)
    //             done();
    //         })
    // })
})