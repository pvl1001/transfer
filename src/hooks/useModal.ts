import { useState } from 'react'


function useModal() {
   const [ visible, setVisible ] = useState( false )

   function closeModal( delay: number | undefined = 200 ): Promise<void> {
      return new Promise( resolve => {
         setVisible( false )
         setTimeout( resolve, delay )
      } )
   }

   function showModal(): void {
      setVisible( true )
   }

   return { visible, closeModal, showModal }
}


export default useModal