type Type = 'error' | 'valid' | void

export function validateError( error: any, touch: any, dirty: any, authError?: string ): Type {
   if ( error && touch || authError ) return 'error'
   if ( !error && dirty ) return 'valid'
}