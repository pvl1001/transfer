export default function validate (
   error: string | undefined,
   touch: boolean | undefined,
   dirty: boolean ): 'error' | 'valid' | void {
   if ( error && touch ) return 'error'
   if ( !error && dirty ) return 'valid'
}