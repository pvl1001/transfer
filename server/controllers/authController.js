const { Op } = require( 'sequelize' );
const { Operators } = require( "../models/models" );
const { sliceData, searchFilter } = require( '../utils/helpers' );
const { attr_operators } = require( "../utils/table_attributes" );
const ApiError = require( '../utils/ApiError' )


class AuthController {

   // войти
   async login( req, res, next ) {
      const { email, password } = req.body
      const operator = await Operators.findOne( {
         where: { email, password },
         attributes: [ 'email', 'name', 'role' ]
      } )

      if ( !operator ) {
         return next( ApiError.badRequest( 'Неправильный логин или пароль' ) )
      }

      return res.json( operator )
   }

}


module.exports = new AuthController()