import { Tabs, Tab } from "@megafon/ui-core";
import s from './Tabs.module.scss'

function TabsBox( { onTabClick } ) {

   const tabs = [
      {
         title: 'Все',
         count: 165,
      },
      {
         title: 'Не согласовано',
         count: 120,
      },
      {
         title: 'Согласовано',
         count: 45,
      },
   ]

   return (
      <Tabs onTabClick={ onTabClick } autoWidth classes={ { swiperWrapper: s.swiperWrapper } }>
         { tabs.map( ( { title, count } ) =>
            <Tab key={ title } title={ `${ title } ${ count }` }/>
         ) }
      </Tabs>
   )
}


export default TabsBox