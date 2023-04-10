const { Operators } = require( "../models/models" );
const sliceData = require( '../utils/sliceData' );
const { Op } = require( 'sequelize' )


const order = [ [ 'createdAt', 'DESC' ] ]

async function getOperators() {
   const operatorsAll = await Operators.findAndCountAll( { order } )
   const operatorsNew = await Operators.findAndCountAll( {
      where: {
         createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date( new Date() - 30 * /* дней */ 24 * /* часов */ 60 * 60 * 1000 )
         }
      },
      order
   } )

   const count = {
      all: operatorsAll.count,
      new: operatorsNew.count,
   }

   return { operatorsAll, operatorsNew, count }
}

async function getResponseOperators( pagination = 1, tab = 'operatorsAll' ) {
   const operators = await getOperators()

   console.log( tab )

   const { slicedData, paginationLength, currentPagination } = sliceData( {
      data: operators[tab].rows, pagination
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
      const { pagination, tab } = req.query
      const operators = await getResponseOperators( pagination, tab )
      return res.json( operators )
   }

   // изменить оператора
   async update( req, res ) {
      const { row, pagination, tab } = req.body
      await Operators.update( row, { where: { id: row.id } } )
      const operators = await getResponseOperators( pagination, tab )
      return res.json( operators )
   }

   // создать оператора
   async create( req, res ) {
      const { row, pagination, tab } = req.body
      await Operators.create( row )
      const operators = await getResponseOperators( pagination, tab )
      return res.json( operators )
   }

   // удалить оператора
   async destroy( req, res ) {
      const { id, pagination, tab } = req.body
      await Operators.destroy( { where: { id } } )
      const operators = await getResponseOperators( pagination, tab )
      return res.json( operators )
   }

}


module.exports = new OperatorsController()