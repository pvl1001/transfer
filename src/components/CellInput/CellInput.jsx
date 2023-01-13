import s from './CellInput.module.scss'
import { useState } from "react";


function CellInput( { onClear, onBlur, CellTitle, ...props } ) {
   const [ isHidden, setIsHidden ] = useState( true )


   function onFocusHandler() {
      setIsHidden( prev => !prev )
   }

   function onBlurHandler() {
      onBlur()
      setIsHidden( prev => !prev )
   }


   return (
      <div className={ s.CellInput }>
         <p className={ s.CellInput__cell_title }>{ CellTitle }</p>
         <input
            { ...props }
            className={ s.CellInput__input }
            onFocus={ onFocusHandler }
            onBlur={ onBlurHandler }
         />
         <button
            hidden={ isHidden }
            onMouseDown={ onClear }
         />
      </div>
   )
}


export default CellInput