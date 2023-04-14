require( 'dotenv' ).config()

const express = require( 'express' )
const sequelize = require( './db' )
const app = express()
const PORT = process.env.PORT || 3003
const cors = require( 'cors' )
const router = require( './routes' )
const fileUpload = require( 'express-fileupload' );
const path = require( "path" );
// const models = require('./models/models')

app.use( cors() )
app.use( fileUpload() )
app.use( express.static( path.resolve( __dirname, 'static' ) ) )
app.use( express.json( { limit: '50mb' } ) )
app.use( '/api', router )

async function start() {
   try {
      await sequelize.authenticate()
      await sequelize.sync()
      app.listen( PORT, () => console.log( "Сервер запущен. Порт " + PORT ) )
   } catch ( err ) {
      console.log( err )
   }
}

start()

