const { Orders } = require( "../models/models" );
const sliceData = require("../utils/sliceData")


async function getOrders( sort = 'DESC' ) {
   const sortOrders = [
      [ 'createdAt', sort ],
      [ 'id', sort ]
   ]

   const ordersAll = await Orders.findAndCountAll( { order: sortOrders } )
   const ordersAgreed = await Orders.findAndCountAll( {
      where: { status: 'Согласовано' },
      order: sortOrders
   } )
   const ordersNoAgreed = await Orders.findAndCountAll( {
      where: { status: 'Не согласовано' },
      order: sortOrders
   } )
   const count = {
      all: ordersAll.count,
      agreed: ordersAgreed.count,
      noagreed: ordersNoAgreed.count
   }

   return { ordersAll, ordersAgreed, ordersNoAgreed, count, sort }
}

async function getResponseOrders( pagination, tab, sort ) {
   const orders = await getOrders( sort )

   const { slicedData, paginationLength, currentPagination } = sliceData( {
      data: orders[tab].rows, pagination
   } )

   return {
      orders: slicedData,
      count: orders.count,
      sortStatus: orders.sort,
      pagination: {
         current: currentPagination || +pagination,
         total: paginationLength
      }
   }
}


class OrdersController {

   // получить все заявки
   async getAll( req, res ) {
      const {
         pagination = 1,
         tab = 'ordersAll',
         sort
      } = req.query
      const responseOrders = await getResponseOrders( pagination, tab, sort )
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
      const { orderForm, tab, pagination } = req.body
      await Orders.create( orderForm )
      const responseOrders = await getResponseOrders( pagination, tab )
      return res.status( 200 ).json( responseOrders )
   }

}


module.exports = new OrdersController()