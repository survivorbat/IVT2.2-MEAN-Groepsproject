const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = chai.expect()
require('dotenv').config()

let testID
chai.use(chaiHttp)

describe('Basic application tests', () => {
    it('should GET basic page', function(done){
        chai.request(server)
        .get('/')
        .end(function (err, res){
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.contain('401');
            done();
        })
    })
})