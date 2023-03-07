import s from './Checkbox.module.scss'
import React from 'react'


const Checkbox = React.forwardRef(
   ( { indeterminate, ...rest }, ref ) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef

      React.useEffect( () => {
         resolvedRef.current.indeterminate = indeterminate
      }, [ resolvedRef, indeterminate ] )

      return (
         <>
            <label className={ s.Checkbox }>
               <input type="checkbox" ref={ resolvedRef } { ...rest }/>
               <span/>
            </label>
         </>
      )
   }
)


export default Checkbox