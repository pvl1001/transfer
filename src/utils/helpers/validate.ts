type Type = 'error' | 'valid' | void

export function validateError ( error: any, touch: any, dirty: any ): Type {
   if ( error && touch ) return 'error'
   if ( !error && dirty ) return 'valid'
}