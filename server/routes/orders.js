const Router = require('express')
const router = new Router()
const { getOrders } = require('../controllers/userController')

router.get('/', getOrders)

module.exports = router