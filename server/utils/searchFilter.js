module.exports = function searchFilter( data, search ) {
   return data.filter( el => Object.values( el ).some( val =>
      JSON.stringify( Object.values( val ) ).toLowerCase().includes( search.toLowerCase() )
   ) )
}