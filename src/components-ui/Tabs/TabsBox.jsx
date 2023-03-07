import { Tabs, Tab } from "@megafon/ui-core";
import s from './Tabs.module.scss'

function TabsBox( { tabs, onTabClick } ) {



   return (
      <Tabs onTabClick={ onTabClick } autoWidth classes={ { swiperWrapper: s.swiperWrapper } }>
         { tabs.map( ( { title, count } ) =>
            <Tab key={ title } title={ `${ title } ${ count }` }/>
         ) }
      </Tabs>
   )
}


export default TabsBox