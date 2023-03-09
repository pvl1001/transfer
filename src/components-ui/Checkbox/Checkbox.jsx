import s from './Checkbox.module.scss'
import React, { forwardRef, useEffect, useRef } from 'react'


const Checkbox = forwardRef(
   ( { indeterminate, setIsVisibleDeletePanel, ...rest }, ref ) => {
      const defaultRef = useRef()
      const resolvedRef = ref || defaultRef

      useEffect( () => {
         resolvedRef.current.indeterminate = indeterminate
      }, [ resolvedRef, indeterminate ] )

      function onInput( e ) {
         if ( e.target.checked ) setIsVisibleDeletePanel( true )
      }


      return (
         <>
            <label className={ s.Checkbox }>
               <input type="checkbox" ref={ resolvedRef } { ...rest } onInput={ onInput }/>
               <span/>
            </label>
         </>
      )
   }
)


export default Checkbox