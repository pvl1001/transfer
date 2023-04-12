const Router = require( 'express' )
const router = new Router()
const ordersController = require( '../controllers/ordersController' )

router.get( '/', ordersController.getAll )
router.post( '/', ordersController.create )
router.delete( '/', ordersController.destroy )
router.put( '/', ordersController.update )

router.get( '/xlsx', ordersController.exportToExel )
router.post( '/xlsx', ordersController.importFromExel )

module.exports = router