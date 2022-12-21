import s from './CellInput.module.scss'
import { useState } from "react";


function CellInput( { onClear, onBlur, CellTitle, ...props } ) {
   const [ isHidden, setIsHidden ] = useState( true )
   const disabled = CellTitle === 'Дата и время'


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
            onFocus={ onFocusHandler }
            onBlur={ onBlurHandler }
            disabled={ disabled }
         />
         <button
            hidden={ isHidden }
            onMouseDown={ onClear }
         />
      </div>
   )
}


export default CellInput