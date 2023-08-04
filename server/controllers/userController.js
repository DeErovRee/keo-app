const ApiError = require('../error/ApiError')
class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async isAuth(req, res, next) {
        res.json({message: 'working!!!'})
    }
}

module.exports = new UserController()