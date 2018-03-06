const {session, neo4j} = require('../config/neodb')

module.exports = {
    getAll(req, res, next){
        const query = "MATCH (u:chatbox) RETURN {id: ID(u), name: u.name, maxPeople: u.maxPeople, since: u.since} as chatbox"
        session.run(query)
            .then(result => result.records.map(item => item._fields[0]))
            .then(transformIntegers)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    },
    add(req,res,next){
        if(req.body.name===undefined || req.body.maxPeople===undefined){
            return res.status(422).json({"result":"Required body parameters are: name, maxPeople"})
        }
        const params = {name: req.body.name, maxPeople: req.body.maxPeople}
        const new_query = "CREATE (u:chatbox {name:$name,maxPeople:$maxPeople, since: timestamp()})"
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch(next)
    },
    update(req,res,next){
        if(req.body.name === undefined || req.body.maxPeople===undefined){
            return res.status(422).json({"result":"Required body parameters are: name, maxPeople"})
        }
        const params = {name: req.body.name, maxPeople: req.body.maxPeople}
        const new_query = "MATCH (chatbox:chatbox {name:$name}) SET chatbox.name=$name, chatbox.maxPeople=$maxPeople"
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch(next)
    },
    delete(req,res,next){
        const params = {name: req.params.id}
        const new_query = "MATCH (n:chatbox {name:$name}) DETACH DELETE (n)"
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch(next)
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