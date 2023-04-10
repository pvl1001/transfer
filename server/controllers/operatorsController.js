const { Op } = require( 'sequelize' );
const { Operators } = require( "../models/models" );
const sliceData = require( '../utils/sliceData' );
const searchFilter = require( "../utils/searchFilter" );


const order = [ [ 'createdAt', 'DESC' ] ]

async function getOperators( search ) {
   const operatorsAll = await Operators.findAll( { order } )
   const operatorsNew = await Operators.findAll( {
      where: {
         createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date( new Date() - 30 * /* дней */ 24 * /* часов */ 60 * 60 * 1000 )
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
   async getAll( req, res ) {
      const operators = await getResponseOperators( req.query )
      return res.json( operators )
   }

   // изменить оператора
   async update( req, res ) {
      const { row, pagination, tab } = req.body
      await Operators.update( row, { where: { id: row.id } } )
      const operators = await getResponseOperators( { pagination, tab } )
      return res.json( operators )
   }

   // создать оператора
   async create( req, res ) {
      const { row, pagination, tab } = req.body
      await Operators.create( row )
      const operators = await getResponseOperators( { pagination, tab } )
      return res.json( operators )
   }

   // удалить оператора
   async destroy( req, res ) {
      const { id, pagination, tab, search } = req.body
      await Operators.destroy( { where: { id } } )
      const operators = await getResponseOperators( { pagination, tab, search } )
      return res.json( operators )
   }

}


module.exports = new OperatorsController()