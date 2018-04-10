const {session, neo4j} = require('../config/neodb')

module.exports = {
    getAll(req, res, next){
        const query = "MATCH (u:chatresource) RETURN {id: ID(u), title: u.title, url: u.url, description: u.description, since: u.since} as chatresource"
        session.run(query)
            .then(result => result.records.map(item => item._fields[0]))
            .then(transformIntegers)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    },
    add(req,res,next){
        if(req.body.title===undefined || req.body.description===undefined || req.body.message===undefined || req.body.url===undefined){
            return res.status(422).json({"result":"Required body parameters are: title, description, message, url"})
        }
        const params = {title: req.body.title, description: req.body.description, message: req.body.message, url: req.body.url}
        const new_query = "MATCH (n:chatmessage) WHERE ID(n) = toInteger($message) MERGE (u:chatresource {title:$title, url: $url,description:$description, since: timestamp()})) CREATE (u)-[:MENTIONED_IN]->(n)"
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch(next)
    },
    update(req,res,next){
        if(req.body.title===undefined || req.body.description===undefined){
            return res.status(422).json({"result":"Required body parameters are: title, description"})
        }
        const params = {title: req.body.title, description: req.body.description, url: req.body.url}
        const new_query = "MATCH (chatresource:chatresource {title:$title}) SET chatresource.title=$title, chatresource.url = $url chatresource.description=$description"
        session.run(new_query,params)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    },
    delete(req,res,next){
        const params = {title: req.params.id}
        const new_query = "MATCH (n:chatresource {title:$title}) DETACH DELETE (n)"
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