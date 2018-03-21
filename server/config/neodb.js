const neo4j = require('neo4j-driver').v1
require('dotenv').config()
const driver = neo4j.driver('bolt://54.197.101.26:34269', neo4j.auth.basic(process.env.NEODB_USER, process.env.NEODB_PASS))
const session = driver.session()

module.exports = {
    session,
    neo4j
}