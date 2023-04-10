const { Operators } = require( "../models/models" );
const sliceData = require('../utils/sliceData');


async function getOperators() {
   const operatorsAll = await Operators.findAndCountAll( { order: [ [ 'createdAt', 'DESC' ] ] } )
   const operatorsNew = await Operators.findAndCountAll( {
      where: { createdAt: '2023-04-10 08:10:40.039109 +00:00' },
      order: [ [ 'createdAt', 'DESC' ] ]
   } )

   const count = {
      all: operatorsAll.count,
      new: []
   }

   return { operatorsAll, operatorsNew, count }
}

async function getResponseOperators( pagination = 1, tab = 'operatorsAll' ) {
   const operators = await getOperators()

   console.log(tab)

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