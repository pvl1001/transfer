import {
   Routes,
   Route, Navigate, useLocation,
} from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage.jsx"
import { useSelector } from "react-redux"
import OrdersPage from "../pages/OrdersPage";
import s from "../pages/MainPage/MainPage.module.scss";
import MainHeader from "./MainHeader/MainHeader";
import OperatorsPage from "../pages/OperatorsPage";


function RequireAuth( { children } ) {
   const auth = useSelector( state => state.auth )
   const location = useLocation()

   if ( auth === null ) {
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

function RequireNoAuth( { children } ) {
   const auth = useSelector( state => state.auth )
   const location = useLocation()

   if ( auth ) {
      return <Navigate to="/orders" state={ { from: location } } replace/>
   }

   return children
}


function App() {
   const location = useLocation()
   if ( location.pathname === '/') return <Navigate to="/login" replace/>

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
