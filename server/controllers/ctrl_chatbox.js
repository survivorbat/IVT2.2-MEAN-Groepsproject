const {Film} = require('../models/film')
const {Showing} = require('../models/showing')
const {Ticket} = require('../models/ticket')

module.exports = {
    getAll(req, res, next){
        const query = "MATCH (u:dier) RETURN {name: u.name, gender: u.geslacht, weight: u.gewicht, length: u.lengte} as dier";
        session.run(query)
            .then(result => result.records.map(item => item._fields[0]))
            .then((result) => {
                res.status(200).json(result);
            })
            .catch(next);
    },
    getByDierentuin(req, res, next){
        const params = {name: req.params.id};
        const query = "MATCH (u:dier)-[:woont_in]-(d:dierentuin {name: $name}) RETURN {name: u.name, gender: u.geslacht, weight: u.gewicht, length: u.lengte} as dier";
        session.run(query, params)
            .then(result => result.records.map(item => item._fields[0]))
            .then((result) => {
                res.status(200).json(result);
            })
            .catch(next);
    },
    getByDiersoort(req, res, next){
        const params = {name: req.params.id};
        const query = "MATCH (u:dier)-[:is_een]-(d:diersoort {name: $name}) RETURN {name: u.name, gender: u.geslacht, weight: u.gewicht, length: u.lengte} as dier";
        session.run(query, params)
            .then(result => result.records.map(item => item._fields[0]))
            .then((result) => {
                res.status(200).json(result);
            })
            .catch(next);
    },
    getByName(req, res, next){
        const params = {name: req.params.id};
        const query = "MATCH (u:dier {name: $name}) RETURN {name: u.name, gender: u.geslacht, weight: u.gewicht, length: u.lengte} as dier";
        session.run(query, params)
            .then(result => result.records.map(item => item._fields[0]))
            .then((result) => {
                res.status(200).json(result);
            })
            .catch(next);
    },
    add(req,res,next){
        if(req.body.name===undefined || req.body.diersoort ===undefined || req.body.dierentuin === undefined || req.body.geslacht === undefined || req.body.gewicht === undefined || req.body.lengte===undefined){
            return res.status(422).json({"result":"Required body parameters are: name, diersoort, dierentuin, geslacht, gewicht, lengte"});
        }
        const params = {name: req.body.name, diersoort: req.body.diersoort, dierentuin: req.body.dierentuin, geslacht: req.body.geslacht, gewicht: req.body.gewicht, lengte: req.body.lengte};
        const new_query = "MATCH (diersoort:diersoort {name:$diersoort}) MATCH (dierentuin:dierentuin {name:$dierentuin}) CREATE (u:dier {name:$name,gewicht:$gewicht, lengte:$lengte, geslacht:$geslacht}) CREATE (u)-[:is_een]->(diersoort) CREATE (u)-[:woont_in]->(dierentuin)";
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch(next);
    },
    addBaby(req,res,next){
        if(req.body.name===undefined || req.body.diersoort ===undefined || req.body.dierentuin === undefined || req.body.geslacht === undefined || req.body.gewicht === undefined || req.body.lengte===undefined || req.body.vader ===undefined || req.body.moeder === undefined){
            return res.status(422).json({"result":"Required body parameters are: name, diersoort, dierentuin, geslacht, gewicht, lengte, vader, moeder"});
        }
        const params = {name: req.body.name, diersoort: req.body.diersoort, dierentuin: req.body.dierentuin, geslacht: req.body.geslacht, gewicht: req.body.gewicht, lengte: req.body.lengte, vader: req.body.vader, moeder: req.body.moeder};
        const new_query = "MATCH (diersoort:diersoort {name:$diersoort}) MATCH (dierentuin:dierentuin {name:$dierentuin}) MATCH (vader:dier {name:$vader}) MATCH (moeder:dier {name:$moeder}) CREATE (u:dier {name:$name,gewicht:$gewicht, lengte:$lengte, geslacht:$geslacht}) CREATE (u)-[:is_een]->(diersoort) CREATE (u)-[:woont_in]->(dierentuin) CREATE (vader)-[:heeft_kind]->(u) CREATE (moeder)-[:heeft_kind]->(u)";
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch(next);
    },
    update(req,res,next){
        if(req.body.gewicht === undefined || req.body.lengte===undefined){
            return res.status(422).json({"result":"Required body parameters are: gewicht, lengte"});
        }
        const params = {gewicht: req.body.gewicht, lengte: req.body.lengte, name: req.params.id};
        const new_query = "MATCH (dier:dier {name:$name}) SET dier.gewicht=$gewicht, dier.lengte=$lengte";
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch(next);
    },
    delete(req,res,next){
        const params = {name: req.params.id};
        const new_query = "MATCH (n:dier {name:$name}) DETACH DELETE (n)";
        session.run(new_query,params)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch(next);
    }
}
