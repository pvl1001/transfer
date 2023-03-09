export function validateError ( error, touch, dirty ) {
   if ( error && touch ) return 'error'
   if ( !error && dirty ) return 'valid'
}