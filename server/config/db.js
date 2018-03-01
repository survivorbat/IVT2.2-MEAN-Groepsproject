const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
}
const timeout = 1000

mongoose.connect(process.env.DB_HOST, options, (error) => {
    if(error){
        console.log("Error connecting to ",process.env.DB_HOST, error)
    } else {
        console.log("Succesfully connected to ",process.env.DB_HOST)
    }
})

mongoose.connection.on('error', (error) => {
    console.log(error.toString())
    mongoose.disconnect()
})

mongoose.connection.on('disconnected', () => {
    console.log('Unable to connect to Mongo, reconnecting...')
    setTimeout(() => connect(), reconnectTimeout)
})

module.exports = mongoose