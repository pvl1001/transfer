const db = require( '../db' )


class UserController {

   async getOrders( req, res ) {
      const data = await db.query( 'SELECT * FROM orders' )
      res.json( { data: data[0], success: true } )
   }
}


module.exports = new UserController()