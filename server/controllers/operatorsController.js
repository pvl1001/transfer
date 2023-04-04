const { Operators } = require( "../models/models" );


class OperatorsController {

   // получить все заявки
   async getAll( req, res ) {
      const operators = await Operators.findAll()
      return res.json( operators )
   }

   // изменить заявку
   async update( req, res ) {
      const row = req.body
      await Operators.update(
         row,
         { where: { id: row.id }, }
      )
      return res.status(200).json('test')
   }

   // создать заявку
   async create( req, res ) {
      const data = req.body
      const operators = await Operators.create( data )
      return res.json( operators )
   }

   // удалить заявку
   async destroy( req, res ) {
      const id = req.body
      await Operators.destroy( {
         where: { id }
      } )
      const operators = await Operators.findAll()
      return res.json( operators )
   }

}


module.exports = new OperatorsController()