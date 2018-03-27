const {session, neo4j} = require('../config/neodb')

module.exports = {
    getAll(req, res, next){
        const query = "MATCH (u:chatbox) RETURN {id: ID(u), name: u.name, since: u.since, description: u.description} as chatbox"
        session.run(query)
            .then(result => result.records.map(item => item._fields[0]))
            .then(transformIntegers)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    },
    add(req,res,next){
        if(req.body.name===undefined || req.body.description===undefined){
            return res.status(422).json({"result":"Required body parameters are: name, maxPeople, description"})
        }
        const params = {name: req.body.name, maxPeople: req.body.maxPeople, description: req.body.description}
        const new_query = "CREATE (u:chatbox {name:$name,description:$description, since: timestamp()})"
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch(next)
    },
    update(req,res,next){
        if(req.body.name === undefined || req.body.description===undefined){
            return res.status(422).json({"result":"Required body parameters are: name, maxPeople"})
        }
        const params = {id: parseInt(req.params.id), name: req.body.name, maxPeople: req.body.maxPeople, description: req.body.description}
        const new_query = "MATCH (chatbox:chatbox) WHERE id(chatbox)= $id SET chatbox.name=$name, chatbox.description = $description"
        session.run(new_query,params)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    },
    delete(req,res,next){
        const params = {id: parseInt(req.params.id)}
        const new_query = "MATCH (n:chatbox) WHERE id(n)= $id OPTIONAL MATCH (n)-[r]-() DELETE r,n"
        session.run(new_query,params)
            .then((result) => {
                res.status(200).json(result)
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
