const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUsers(req, res) {
    try {
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

module.exports = {
    getUsers,
}