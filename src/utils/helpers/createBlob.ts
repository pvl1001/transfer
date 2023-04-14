async function createBlob( url: string, filename: string ) {
   const response = await fetch( url )
   const contentType = response.headers.get( 'content-type' )
   const blob = await response.blob()
   return new File( [ blob ], filename, { contentType } as any )
}

export default createBlob;