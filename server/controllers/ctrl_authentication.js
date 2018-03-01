const auth = require('../auth/authentication') //Get the authentication object
const { validationResult } = require('express-validator/check')
const {session} = require('../config/neodb')
require('dotenv').config()

module.exports = {
    checkAuthentication(req, res, next){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() })
        }
        const query = "MATCH (u:User) WHERE u.email=$email AND u.password = $password RETURN u LIMIT 1"
        const params = {"email": req.body.email, "password": req.body.password}
        session.run(query, params)
            .then(function(result) {
                if(!result.records[0]) return res.status(401).json({ "error": "Invalid credentials"})
                if(result.records[0].length===1){
                    const token = auth.encryptAuthToken(result.records[0]._fields[0].properties.authlevel.low,result.records[0]._fields[0].identity.low)
                    return res.status(201).json({"token": token, "authlevel": result.records[0]._fields[0].properties.authlevel.low})
                } else {
                    return res.status(401).json({ "error": "Invalid credentials"})
                }
            })
            .catch(function(error) {
                console.log(error)
                res.status(500).json({message:"An error occured"})
                return
            })
    }
}
