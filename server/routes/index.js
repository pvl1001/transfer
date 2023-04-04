const express = require('express')
const router = express.Router()
const orders = require('./ordersRouter')
const operators = require('./operatorsRouter')

router.use('/orders', orders)
router.use('/operators', operators)

module.exports = router


