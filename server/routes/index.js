const express = require('express')
const router = express.Router()
const orders = require('./ordersRouter')

router.use('/orders', orders)

module.exports = router


