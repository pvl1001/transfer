const { unlink } = require( "fs" );
const path = require( "path" );

class Helpers {

   // пагинация
   sliceData( { data, pagination } ) {
      const count = 8
      const paginationLength = Math.ceil( data.length / count )
      const slicedKey = pagination - 1

      const slicedArray = []
      if ( data.length ) {
         for ( let i = 0; i < data.length; i += count ) {
            slicedArray.push( data.slice( i, i + count ) )
         }
      }

      // корректировка при удалении
      const slicedData = slicedArray[slicedKey] || slicedArray[slicedArray.length - 1] || []
      const currentPagination = typeof slicedArray[slicedKey] === 'undefined' ? pagination - 1 : 0

      return { slicedData, paginationLength, currentPagination }
   }

   // поисковая строка
   searchFilter( data, search ) {
      return data.filter( el => Object.values( el ).some( val =>
         JSON.stringify( Object.values( val ) ).toLowerCase().includes( search.toLowerCase() )
      ) )
   }

   unlinkHandler( filename ) {
      unlink( path.resolve( __dirname, '../static', filename ), ( err ) => {
         if ( err ) return Promise.reject( err )
         console.log( 1, filename + ' unlink success' )
      } )
   }
}


module.exports = new Helpers()
