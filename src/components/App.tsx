import {
   Routes,
   Route, Navigate, useLocation,
} from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import OrdersPage from "../pages/OrdersPage";
import s from "../pages/MainPage.module.scss";
import MainHeader from "./MainHeader/MainHeader";
import OperatorsPage from "../pages/OperatorsPage";
import { useAppSelector } from "../redux/store";
import { FC, PropsWithChildren } from "react";


const RequireAuth: FC<PropsWithChildren> = ( { children } ) => {
   const location = useLocation()
   const auth = useAppSelector( state => state.auth )

   if ( auth.user === null ) {
      return <Navigate to="/login" state={ { from: location } } replace/>
   }

   return (
      <div className={ s.MainPage }>
         <MainHeader/>
         <div className={ `${ s.MainPage__container } wrapper` }>
            { children }
         </div>
      </div>
   )
}

const RequireNoAuth: FC<PropsWithChildren> = ( { children } ) => {
   const auth = useAppSelector( state => state.auth )
   const location = useLocation()

   if ( auth.user ) {
      return <Navigate to="/orders" state={ { from: location } } replace/>
   }

   return <>{ children }</>
}


function App() {
   const location = useLocation()
   if ( location.pathname === '/' ) return <Navigate to="/login" replace/>

   return (
      <Routes>

         <Route path="/login" element={
            <RequireNoAuth>
               <LoginPage/>
            </RequireNoAuth>
         }/>

         <Route path="/orders" element={
            <RequireAuth>
               <OrdersPage/>
            </RequireAuth>
         }/>

         <Route path="/operators" element={
            <RequireAuth>
               <OperatorsPage/>
            </RequireAuth>
         }/>

      </Routes>
   )
}


export default App
