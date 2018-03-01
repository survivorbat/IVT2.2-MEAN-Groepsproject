const neo4j = require('neo4j-driver').v1
require('dotenv').config()
const driver = neo4j.driver('bolt://52.91.116.67:32859', neo4j.auth.basic(process.env.NEODB_USER, process.env.NEODB_PASS))
const session = driver.session()

module.exports = {
    session,
    driver
}