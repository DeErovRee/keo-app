const Router = require('express')
const router = new Router()
const tablesController = require('../controllers/tablesController')

router.get('/', tablesController.get)

module.exports = router