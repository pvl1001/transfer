import s from './CellInput.module.scss'
import { useState } from "react";


function CellInput( { onClear, onBlur, ...props } ) {
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
         <input
            { ...props }
            onFocus={ onFocusHandler }
            onBlur={ onBlurHandler }
         />
         <button
            className={ s.CellInput__btn_clear }
            hidden={ isHidden }
            onMouseDown={ onClear }
         />
      </div>
   )
}


export default CellInput