const { Orders } = require( "../models/models" );
const sliceData = require( "../utils/sliceData" )


async function getOrders( sort = 'DESC', search ) {
   const sortOrders = [
      [ 'createdAt', sort ],
      [ 'id', sort ]
   ]

   console.log('search'.toUpperCase(), search)

   const ordersAll = await Orders.findAll( { order: sortOrders } )
   const ordersAgreed = await Orders.findAll( {
      where: { status: 'Согласовано' },
      order: sortOrders
   } )
   const ordersNoAgreed = await Orders.findAll( {
      where: { status: 'Не согласовано' },
      order: sortOrders
   } )

   function searchFilter( data ) {
      return data.filter( el => Object.values( el ).some( val =>
         JSON.stringify( Object.values( val ) ).toLowerCase().includes( search.toLowerCase() )
      ) )
   }

   if ( search ) {
      const filterOrdersAll = searchFilter( ordersAll )
      const filterOrdersAgreed = searchFilter( ordersAgreed )
      const filterOrdersNoAgreed = searchFilter( ordersNoAgreed )

      return {
         ordersAll: filterOrdersAll,
         ordersAgreed: filterOrdersAgreed,
         ordersNoAgreed: filterOrdersNoAgreed,
         count: {
            all: filterOrdersAll.length,
            agreed: filterOrdersAgreed.length,
            noagreed: filterOrdersNoAgreed.length,
         },
         sort
      }
   }

   return {
      ordersAll,
      ordersAgreed,
      ordersNoAgreed,
      count: {
         all: ordersAll.length,
         agreed: ordersAgreed.length,
         noagreed: ordersNoAgreed.length
      },
      sort
   }
}

async function getResponseOrders( { pagination, tab, sort, search } ) {
   const orders = await getOrders( sort, search )

   const { slicedData, paginationLength, currentPagination } = sliceData( {
      data: orders[tab], pagination
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
         sort,
         search
      } = req.query

      const responseOrders = await getResponseOrders( { pagination, tab, sort, search } )
      return res.status( 200 ).json( responseOrders )
   }

   // удалить заявку
   async destroy( req, res ) {
      const { id, pagination, tab, search } = req.body
      await Orders.destroy( { where: { id } } )
      const responseOrders = await getResponseOrders( { pagination, tab, search } )
      return res.status( 200 ).json( responseOrders )
   }

   // изменить заявку
   async update( req, res ) {
      const { row, pagination, tab } = req.body
      await Orders.update(
         row,
         { where: { id: row.id } }
      )
      const responseOrders = await getResponseOrders( { pagination, tab } )
      return res.status( 200 ).json( responseOrders )
   }

   // создать заявку
   async create( req, res ) {
      const { orderForm, tab, pagination } = req.body
      await Orders.create( orderForm )
      const responseOrders = await getResponseOrders( { pagination, tab } )
      return res.status( 200 ).json( responseOrders )
   }

}


module.exports = new OrdersController()