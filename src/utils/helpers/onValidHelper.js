export default function ( error, touch, dirty ) {
   console.log(error, touch, dirty)
   if ( error && touch ) return 'error'
   if ( !error && dirty ) return 'valid'
   return 'test'
}