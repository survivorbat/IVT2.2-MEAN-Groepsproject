const moment = require('moment')
const jwt = require('jwt-simple')
require('dotenv').config()

function encryptAuthToken(authlevel,userid){
	const payload = {
		exp: moment().add(2, 'hours').unix(),
		iat: moment().unix(),
		sub: {
			authlevel: authlevel,
			userid: userid
		}
	}
	return jwt.encode(payload, process.env.SECRET_KEY)
}

function decryptAuthToken(token, callback){
	try {
		const payload = jwt.decode(token, process.env.SECRET_KEY)
		const now = moment().unix
		if(now > payload.exp){
			console.log('This token has expired.')
		}
		callback(null, payload)
	}
	catch(error){
		callback(error, null)
	}
}

module.exports = {
	encryptAuthToken,
	decryptAuthToken
}
