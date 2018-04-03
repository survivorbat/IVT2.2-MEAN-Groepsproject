const auth = require('../auth/authentication') //Get the authentication object
const { validationResult } = require('express-validator/check')
const {session, neo4j} = require('../config/neodb')
require('dotenv').config()

module.exports = {
    checkAuthentication(req, res, next){
        const query = "MATCH (u:user) WHERE u.username=$username AND u.password = $password RETURN {id: ID(u), username: u.username, password: u.password} as user"
        const params = {"username": req.body.username, "password": req.body.password}
        session.run(query, params)
            .then(result => result.records.map(item => item._fields[0]))
            .then(transformIntegers)
            .then(function(result) {
                console.log(result[0])
                if(!result) return res.status(401).json({ "error": "Invalid credentials"})
                if(result.length===1){
                    const token = auth.encryptAuthToken(result[0].id)
                    return res.status(201).json({"token": token})
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

const transformIntegers = function(result) {
    return new Promise( (resolve,reject) => {
      try {
        result.forEach((row, i)=>  {
            Object.keys(row).forEach((val, j) => {

                row[val] = neo4j.isInt(row[val])
                ? (neo4j.integer.inSafeRange(row[val]) ? row[val].toNumber() : row[val].toString())
                : row[val];
            })
        })
        resolve(result);
      } catch (error) {
          reject( error );
      }
    });
  };
