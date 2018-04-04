const moment = require('moment')
const {session, neo4j} = require('../config/neodb')


module.exports = {
    getAll(req, res, next){
        const query = "MATCH (m:chatmessage) MATCH(u:user)-->(m) MATCH(chatbox:chatbox)<--(m) RETURN {id: ID(m),username: u.username, chatbox: ID(chatbox), userid: ID(u), text: m.text, since: m.since} as chatmessage"
        session.run(query)
            .then(result => result.records.map(item => item._fields[0]))
            .then(transformIntegers)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    },
    getByChatbox(req, res, next){
        if(req.params.chatbox===undefined){
            return res.status(422).json({"result":"Please add text and a chatbox to your message"})
        }
        const query = "MATCH (m:chatmessage) MATCH(u:user)-->(m) MATCH(chatbox:chatbox)<--(m) WHERE ID(chatbox) = $chatbox RETURN {id: ID(m),username: u.username, chatbox: ID(chatbox), userid: ID(u), text: m.text, since: m.since} as chatmessage"
        const params = {chatbox: parseInt(req.params.chatbox)}
        session.run(query,params)
            .then(result => result.records.map(item => item._fields[0]))
            .then(transformIntegers)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    },
    add(req,res,next){
        console.log(req.body,req.user.sub.userid)
        if(req.body.text===undefined || req.body.chatbox===undefined){
            return res.status(422).json({"result":"Please add text and a chatbox to your message"})
        }
        const params = {text: req.body.text, chatbox: parseInt(req.body.chatbox), by: req.user.sub.userid}
        const new_query = "MATCH (u:chatbox) WHERE ID(u)=$chatbox MATCH (user:user) WHERE ID(user)=$by CREATE (user)-[:POSTED]->(m:chatmessage {text:$text, since: timestamp()})-[:POSTED_IN]->(u)"
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch(next)
    },
    update(req,res,next){
        if(req.body.name === undefined || req.body.maxPeople===undefined || req.body.description===undefined){
            return res.status(422).json({"result":"Required body parameters are: name, maxPeople"})
        }
        const params = {id: parseInt(req.params.id), name: req.body.name, maxPeople: req.body.maxPeople, description: req.body.description}
        const new_query = "MATCH (chatbox:chatbox) WHERE id(chatbox)= $id SET chatbox.name=$name, chatbox.maxPeople=$maxPeople, chatbox.description = $description"
        session.run(new_query,params)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next)
    },
    delete(req,res,next){
        const params = {id: parseInt(req.params.id)}
        const new_query = "MATCH (n:chatmessage) WHERE id(n)= $id OPTIONAL MATCH (n)-[r]-() DELETE r,n"
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