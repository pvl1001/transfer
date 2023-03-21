import s from './Checkbox.module.scss'
import {
   ChangeEvent,
   forwardRef,
   useEffect,
   useRef
} from 'react'

type TProps = {
   indeterminate: boolean
   setIsVisibleDeletePanel: (state: boolean) => void
}

/* eslint-disable react/display-name */
const Checkbox = forwardRef<HTMLInputElement, TProps>(
   ( { indeterminate, setIsVisibleDeletePanel, ...rest }, ref ) => {
      const defaultRef = useRef<HTMLInputElement>( null )
      const resolvedRef = ref || defaultRef

      useEffect( () => {
         // @ts-ignore
         resolvedRef.current.indeterminate = indeterminate
      }, [ resolvedRef, indeterminate ] )

      function onInput( e: ChangeEvent<HTMLInputElement> ) {
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