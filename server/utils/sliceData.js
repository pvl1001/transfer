module.exports = function searchFilter( { data, pagination } ) {
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
