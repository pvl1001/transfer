import { Tabs, Tab } from "@megafon/ui-core";
import s from './TabsBox.module.scss'
import { FC } from "react";
import { TTab } from "../../utils/types";


type TTabsBox = {
   tabs: TTab[]
   onTabClick: ( index: number ) => void
   defaultIndex: number
}


const TabsBox: FC<TTabsBox> = ( { tabs, onTabClick, defaultIndex } ) => {
   return (
      <Tabs
         defaultIndex={ defaultIndex }
         onTabClick={ onTabClick }
         classes={ { swiperWrapper: s.swiperWrapper } }
      >
         { tabs.map( ( { title, count } ) =>
            <Tab key={ title } title={ `${ title } ${ count }` }/>
         ) }
      </Tabs>
   )
}


export default TabsBox