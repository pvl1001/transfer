const Router = require( 'express' )
const router = new Router()
const operatorsController = require( '../controllers/operatorsController' )

router.get( '/', operatorsController.getAll )
router.post( '/', operatorsController.create )
router.delete( '/', operatorsController.destroy )
router.put( '/', operatorsController.update )
router.get( '/xlsx', operatorsController.exportToExel )

module.exports = router