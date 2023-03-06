import { Tab, Tabs } from "@megafon/ui-core"
import s from "./HeaderTabs.module.scss"
import { useNavigate } from "react-router"
import { useLocation } from "react-router-dom"

function HeaderTabs( { className = '' } ) {
   const navigate = useNavigate()
   const location = useLocation()

   function onTabClick( i ) {
      if ( i === 0 ) navigate( '/orders' )
      if ( i === 1 ) navigate( '/operators' )
   }


   return (
      <div className={ `${ s._ } ${ className }` }>
         <Tabs
            autoWidth
            onTabClick={ onTabClick }
            defaultIndex={ location.pathname === '/orders' ? 0 : 1 }
         >
            <Tab title={ 'Заявки' }/>
            <Tab title={ 'Операторы' }/>
         </Tabs>
      </div>
   )
}

export default HeaderTabs