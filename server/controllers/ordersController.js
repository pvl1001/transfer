const { Op } = require( "sequelize" );
const { Orders } = require( "../models/models" );
const { sliceData, searchFilter } = require( "../utils/helpers" )
const { attr_orders } = require( '../utils/table_attributes' )
// const moment = require( "moment" );


async function getOrders( sort = 'DESC', search ) {
   const sortOrders = [
      [ 'createdAt', sort ],
      [ 'id', sort ]
   ]

   const ordersAll = await Orders.findAll( { order: sortOrders } )
   const ordersAgreed = await Orders.findAll( {
      where: { status: 'Согласовано' },
      order: sortOrders
   } )
   const ordersNoAgreed = await Orders.findAll( {
      where: { status: 'Не согласовано' },
      order: sortOrders
   } )

   if ( search ) {
      const filterOrdersAll = searchFilter( ordersAll, search )
      const filterOrdersAgreed = searchFilter( ordersAgreed, search )
      const filterOrdersNoAgreed = searchFilter( ordersNoAgreed, search )

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

async function getResponseOrders( { pagination = 1, tab = 'ordersAll', sort, search } ) {
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
      const responseOrders = await getResponseOrders( req.query )
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

   // из БД в Exel
   async exportToExel( req, res ) {
      // обработка query параметров
      const { dateFrom, dateTo, ...query } =
         Object.fromEntries( Object.entries( req.query ).filter( ( [ _, val ] ) => val ) )

      const where = dateFrom
         ? {
            ...query,
            createdAt: {
               [Op.gt]: dateFrom,
               [Op.lt]: new Date( new Date( dateTo ) - -24 * /* часов */ 60 * 60 * 1000 ),
            }
         }
         : query

      const responseOrders = await Orders.findAll( { attributes: attr_orders, where } )

      // отформатировать дату перед отправкой
      // responseOrders.forEach( el => {
      //    const date = el.dataValues['Дата внесения']
      //    el.dataValues['Дата внесения'] = moment( date ).format( 'DD.MM.YYYY' )
      //    return el
      // } )

      return res.status( 200 ).json( responseOrders )
   }

   // из Exel в БД
   async importFromExel( req, res ) {
      const orders = req.body
      await Orders.bulkCreate( orders, { updateOnDuplicate: [ 'id' ] } )
      const responseOrders = await getResponseOrders( {} )
      return res.status( 200 ).json( responseOrders )
   }

}


module.exports = new OrdersController()