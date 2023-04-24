const { Op } = require( 'sequelize' );
const { Operators } = require( "../models/models" );
const { sliceData, searchFilter } = require( '../utils/helpers' );
const { attr_operators } = require( "../utils/table_attributes" );
const ApiError = require( '../utils/ApiError' )


const order = [ [ 'createdAt', 'DESC' ] ]

async function getOperators( search ) {
   const operatorsAll = await Operators.findAll( { order } )
   const operatorsNew = await Operators.findAll( {
      where: {
         createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date( new Date() - 1 * /* дней */ 24 * /* часов */ 60 * 60 * 1000 )
         }
      },
      order
   } )

   if ( search ) {
      const filterOperatorsAll = searchFilter( operatorsAll, search )
      const filterOperatorsNew = searchFilter( operatorsNew, search )

      return {
         operatorsAll: filterOperatorsAll,
         operatorsNew: filterOperatorsNew,
         count: {
            all: filterOperatorsAll.length,
            new: filterOperatorsNew.length,
         },
      }
   }

   return {
      operatorsAll,
      operatorsNew,
      count: {
         all: operatorsAll.length,
         new: operatorsNew.length,
      }
   }
}

async function getResponseOperators( { pagination = 1, tab = 'operatorsAll', search } ) {
   const operators = await getOperators( search )

   const { slicedData, paginationLength, currentPagination } = sliceData( {
      data: operators[tab], pagination
   } )

   return {
      operators: slicedData,
      count: operators.count,
      pagination: {
         current: currentPagination || +pagination,
         total: paginationLength
      }
   }
}

class OperatorsController {

   // получить всех операторов
   async getAll( req, res, next ) {
      const operators = await getResponseOperators( req.query )
      return res.json( operators )
   }

   // изменить оператора
   async update( req, res, next ) {
      const { row, pagination, tab, search } = req.body
      const update = await Operators.update( row, { where: { id: row.id } } )

      if ( !update?.length ) return next( ApiError.badRequest( 'Ошибка обновления данных' ) )

      const operators = await getResponseOperators( { pagination, tab, search } )
      return res.json( operators )
   }

   // создать оператора
   async create( req, res, next ) {
      const { row, pagination, tab } = req.body
      const isCreate = await Operators.create( row )

      if ( !isCreate ) return next( ApiError.badRequest( 'Ошибка добавления оператора' ) )

      const operators = await getResponseOperators( { pagination, tab } )
      setTimeout( () => {
         return res.json( operators )
      }, 2000 )
   }

   // удалить оператора
   async destroy( req, res, next ) {
      const { id, pagination, tab, search } = req.body
      const isDestroy = await Operators.destroy( { where: { id } } )

      if ( !isDestroy ) return next( ApiError.badRequest( 'Ошибка удаления оператора' ) )

      const operators = await getResponseOperators( { pagination, tab, search } )
      setTimeout( () => {
         return res.json( operators )
      }, 2000 )
   }

   async exportToExel( req, res, next ) {
      const operators = await Operators.findAll( { attributes: attr_operators } )
      return res.status( 200 ).json( operators )
   }

}


module.exports = new OperatorsController()