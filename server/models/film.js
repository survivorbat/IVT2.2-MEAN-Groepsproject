const mongoose = require('../config/db')

const Schema = mongoose.Schema
const filmSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A film requires a title'],
        minlength: [1, 'Title has to be longer than 0 characters']
    },
    subtitle: {
        type: String,
        required: false
    },
    directors: {
        type: [String],
        required: false,
        minlength: [1, 'Directorlist has to be longer than 0 characters']
    },
    writers: {
        type: [String],
        required: false,
        default:[]
    },
    stars: {
        type: [String],
        required: false,
        default: []
    },
    popularity: {
        type: Number,
        min: [1,'Popularity has to be at least 1 star'],
        max: [10,'Popularity has to be at maximum 10 stars'],
        default: 5
    },
    coverPicture: {
        type: String,
        required:false
    },
    year: {
        type: String,
        required: [true, 'A year is required'],
        min: [1800, 'The year has to be higher than 1800'],
        max: [2100, 'The year can not be higher than 2100']
    },
    duration: {
        type: String,
        required: [true, 'A film duration is required'],
        min: [5, 'Duration has to be at least 5 minutes'],
        max: [400, 'Duration has to be at maximum 400 minutes']
    },
    description: {
        type: String,
        required: [true, 'A description is required'],
        minlength: [50, 'Description has to be at least 50 characters long'],
        maxlength: [1000, 'Description can only be 1000 characters long']
    },
    genre: {
        type: String,
        required: [true, 'A genre is required'],
        minlength: [1, 'Genre length has to be at least 1 character long'],
        maxlength: [15, 'Genre length can not be longer than 15 characters']
    }
})
const Film = mongoose.model('Film', filmSchema)

module.exports = {
    Film
};