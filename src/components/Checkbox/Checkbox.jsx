import s from './Checkbox.module.scss'


function Checkbox( props ) {
   return (
      <label className={ s.Checkbox } { ...props }>
         <input type="checkbox" />
         <span/>
      </label>
   )
}


export default Checkbox