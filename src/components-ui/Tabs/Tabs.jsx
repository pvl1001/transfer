import s from './Tabs.module.scss'


function Tabs() {

   const tabs = [
      {
         value: 'Все',
         count: 165,
      },
      {
         value: 'Не согласовано',
         count: 120,
      },
      {
         value: 'Согласовано',
         count: 45,
      },
   ]

   return (
      <ul className={ s.Tabs }>

         { tabs.map( ( { value, count } ) =>
            <li key={ value } className={ s.Tabs__item }>
               <label>
                  <input type="radio" name="tab" value={ value } defaultChecked={ value === 'Все' }/>
                  <div><span>{ value }</span> { count }</div>
               </label>

            </li>
         ) }

      </ul>
   )
}


export default Tabs