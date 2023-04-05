const { Orders } = require( "../models/models" );


function sliceData( { data, pagination } ) {
   const count = 8
   const paginationLength = Math.ceil( data.length / count )
   const slicedKey = pagination - 1

   const slicedArray = []
   if ( data.length ) {
      for ( let i = 0; i < data.length; i += count ) {
         slicedArray.push( data.slice( i, i + count ) )
      }
   }

   // корректировка при удалении
   const slicedData = slicedArray[slicedKey] || slicedArray[slicedArray.length - 1] || []
   const currentPagination = typeof slicedArray[slicedKey] === 'undefined' ? pagination - 1 : 0

   return { slicedData, paginationLength, currentPagination }
}

async function getOrders() {
   const ordersAll = await Orders.findAndCountAll()
   const ordersAgreed = await Orders.findAndCountAll( { where: { status: 'Согласовано' } } )
   const ordersNoAgreed = await Orders.findAndCountAll( { where: { status: 'Не согласовано' } } )
   const count = {
      all: ordersAll.count,
      agreed: ordersAgreed.count,
      noagreed: ordersNoAgreed.count
   }
   return { ordersAll, ordersAgreed, ordersNoAgreed, count }
}

async function getResponseOrders( pagination, tab ) {
   const orders = await getOrders()

   const { slicedData, paginationLength, currentPagination } = sliceData( {
      data: orders[tab].rows, pagination
   } )

   return {
      orders: slicedData,
      count: orders.count,
      pagination: {
         current: currentPagination || +pagination,
         total: paginationLength
      }
   }
}


class OrdersController {

   // получить все заявки
   async getAll( req, res ) {
      const { pagination = 1, tab = 'ordersAll' } = req.query
      const responseOrders = await getResponseOrders( pagination, tab )
      return res.status( 200 ).json( responseOrders )
   }

   // удалить заявку
   async destroy( req, res ) {
      const { id, pagination, tab } = req.body
      await Orders.destroy( { where: { id } } )
      const responseOrders = await getResponseOrders( pagination, tab )
      return res.status( 200 ).json( responseOrders )
   }

   // изменить заявку
   async update( req, res ) {
      const { row, pagination, tab } = req.body
      await Orders.update(
         row,
         { where: { id: row.id } }
      )
      const responseOrders = await getResponseOrders( pagination, tab )
      return res.status( 200 ).json( responseOrders )
   }

   // создать заявку
   async create( req, res ) {
      const data = req.body
      const orders = await Orders.create( data )
      return res.status( 200 ).json( orders )
   }

}


module.exports = new OrdersController()