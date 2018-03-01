const {Film} = require('../models/film')
const {Showing} = require('../models/showing')
const {Ticket} = require('../models/ticket')

module.exports = {
    getAll(req, res, next){
        Film.find().then((films) => {
            if(!films){
                res.status(200).json([])
                return
            }
            films = films.map(film => {
                film = film.toObject()
                film.url = req.protocol+"://"+req.get('host')+"/api/films/"+film._id
                return film
            })
            res.status(200).json(films)
        }).catch(err => {
            next(err)
        })
    },
    getById(req, res, next){
        Film.findOne({_id: req.params._id}).then(film => {
            try {
                film = film.toObject()
                film.url = req.protocol+"://"+req.get('host')+"/api/films/"+film._id
            }
            catch(e){
                res.status(404).json({})
                return
            }
            res.status(200).json(film)
        }).catch(err => {
            next(err)
        })
    },
    post(req,res,next){
        if(req.body.stars && !Array.isArray(req.body.stars)) req.body.stars = req.body.stars.split(',')
        if(req.body.writers && !Array.isArray(req.body.writers)) req.body.writers = req.body.writers.split(',')
        if(req.body.directors && !Array.isArray(req.body.directors)) req.body.directors = req.body.directors.split(',')
        const newFilm = new Film(req.body, {})
        newFilm.save().then(result => {
            res.status(201).json({"message":"succes","createdObject":result})
        }).catch(err => {
            next(err)
        })
    },
    update(req, res, next){
        if(req.body.stars && !Array.isArray(req.body.stars)) req.body.stars = req.body.stars.split(',')
        if(req.body.writers && !Array.isArray(req.body.writers)) req.body.writers = req.body.writers.split(',')
        if(req.body.directors && !Array.isArray(req.body.directors)) req.body.directors = req.body.directors.split(',')
        Film.findByIdAndUpdate(req.params._id,req.body).then(result => {
            res.status(200).json({"message":"succes","createdObject":result})
        }).catch(err => {
            next(err)
        })
    },
    delete(req,res,next){
        Ticket.find({"showing.film": req.params._id}).remove().catch()
        Showing.find({"film": req.params._id}).remove().catch()
        Film.findByIdAndRemove(req.params._id).then(result => {
            if(!result){
                res.status(404).json({})
                return
            }
            Showing.find({"film": result._id}).remove((err, result) => {
                console.log(result)
            })
            res.status(200).json({message:"succes",deletedObject: result})
        }).catch(err => next(err))
    }
}
