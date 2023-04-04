const { Orders } = require( "../models/models" );


function sliceData( { data, paginationValue, req } ) {
   const count = 8
   const paginationLength = Math.ceil( data.length / count )
   const slicedKey = (req.query.page || paginationValue) - 1

   const slicedArray = []
   if ( data.length ) {
      for ( let i = 0; i < data.length; i += count ) {
         slicedArray.push( data.slice( i, i + count ) )
      }
   }

   return { slicedData: slicedArray[slicedKey] || [], paginationLength }
}


class OrdersController {

   // получить все заявки
   async getAll( req, res ) {
      const paginationValue = req.body
      const orders = await Orders.findAll()

      const { slicedData, paginationLength } = sliceData( {
         data: orders, paginationValue, req
      } )

      return res.json( {
         data: slicedData,
         pagination: {
            value: paginationValue,
            total: paginationLength
         }
      } )
   }

   // изменить заявку
   async update( req, res ) {
      const row = req.body
      await Orders.update(
         row,
         { where: { id: row.id }, }
      )
      return res.status( 200 ).json( 'test' )
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