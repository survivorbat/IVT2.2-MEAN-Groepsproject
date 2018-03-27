const {session} = require('../config/neodb')

module.exports = {
    getAll(req, res, next){
        const query = "MATCH (u:user) RETURN u"
        session.run(query)
            .then((result) => {
                res.status(200).json(result.records)
            })
            .catch(next)
    },
    post(req,res,next){
        const params = {username: req.body.username, password: req.body.password}
        const search_query = "MATCH (u:user) WHERE u.username=$username RETURN u"
        session.run(search_query,params).then((result) => {
            if(result.records[0]===undefined){
                createNewUser()
            } else if(result.records[0].length>0){
                return res.status(409).json({ "error": "User with that username already exists"})
            } else {
                createNewUser()
            }
        })
        function createNewUser(){
            const new_query = "CREATE (u:user {username:$username,password:$password}) RETURN u"
            session.run(new_query,params)
                .then((result) => {
                    res.status(201).json({result:"succes!"})
                })
                .catch(next)
        }
    },
    update(req, res, next){
        
    },
    delete(req,res,next){
        const params = {id: parseInt(req.params._id)}
        const delete_query = "MATCH (u:user) WHERE ID(u)=$id DELETE u"
        session.run(delete_query,params).then((result) => {
            res.status(204).json()
        }).catch(next)
    }
}
