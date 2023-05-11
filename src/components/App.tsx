import {
   Routes,
   Route, Navigate, useLocation,
} from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import OrdersPage from "../pages/OrdersPage";
import OperatorsPage from "../pages/OperatorsPage";
import { useAppDispatch, useAppSelector } from "../redux/store";
import AlertMessage from "./AlertMessage/AlertMessage";
import { getCookie } from "../utils/setCookie";
import { setUser } from "../redux/slices/authSlice";
import routes from '../utils/routes'
import RequireNoAuth from "./_hocs/RequireNoAuth";
import RequireAuth from "./_hocs/RequireAuth";
import RequireRole from "./_hocs/RequireRole";


function App() {
   const dispatch = useAppDispatch()
   const user = useAppSelector( state => state.auth.user )

   const location = useLocation()
   if ( location.pathname === '/' ) return <Navigate to="/login" replace/>

   // записать юзера из куки
   const cookieUser = getCookie( 'user' )
   if ( !user && cookieUser ) {
      dispatch( setUser( JSON.parse( cookieUser ) ) )
   }


   return (
      <>
         <Routes>

            <Route path={ routes.login } element={
               <RequireNoAuth>
                  <LoginPage/>
               </RequireNoAuth>
            }/>

            <Route path={ routes.orders } element={
               <RequireAuth>
                  <OrdersPage/>
               </RequireAuth>
            }/>

            <Route path={ routes.operators } element={
               <RequireAuth>
                  <RequireRole>
                     <OperatorsPage/>
                  </RequireRole>
               </RequireAuth>
            }/>

         </Routes>

         <AlertMessage/>
      </>
   )
}


export default App
