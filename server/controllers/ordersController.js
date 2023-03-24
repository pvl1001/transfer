const { Orders } = require( "../models/models" );


class OrdersController {

   // получить все заявки
   async getAll( req, res ) {
      const orders = await Orders.findAll()
      return res.json( orders )
   }

   // изменить заявку
   async update( req, res ) {
      const row = req.body
      await Orders.update(
         row,
         { where: { id: row.id }, }
      )
      return res.status(200).json('test')
   }

   // создать заявку
   async create( req, res ) {
      const data = req.body
      const orders = await Orders.create( data )
      return res.json( orders )
   }

   // удалить заявку
   async destroy( req, res ) {
      const id = req.body
      await Orders.destroy( {
         where: { id }
      } )
      const orders = await Orders.findAll()
      return res.json( orders )
   }

}


module.exports = new OrdersController()