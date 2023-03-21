import { Tabs, Tab } from "@megafon/ui-core";
import s from './TabsBox.module.scss'
import { FC } from "react";
import { TTab } from "../../utils/types";


type TTabsBox = {
   tabs: TTab[]
   onTabClick: ( index: number ) => void
}


const TabsBox: FC<TTabsBox> = ( { tabs, onTabClick } ) => {
   return (
      <Tabs onTabClick={ onTabClick } autoWidth classes={ { swiperWrapper: s.swiperWrapper } }>
         { tabs.map( ( { title, count } ) =>
            <Tab key={ title } title={ `${ title } ${ count }` }/>
         ) }
      </Tabs>
   )
}


export default TabsBox