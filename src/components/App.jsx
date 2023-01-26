import {
   Routes,
   Route, Navigate, useLocation,
} from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage.jsx"
import MainPage from "../pages/MainPage/MainPage.jsx"
import { useSelector } from "react-redux"


function RequireAuth( { children } ) {
   let auth = useSelector( state => state.auth )
   let location = useLocation()

   if ( auth === null ) {
      return <Navigate to="/login" state={ { from: location } } replace/>
   }

   return children
}


function App() {

   return (
      <Routes>
         <Route path="/login" element={ <LoginPage/> }/>
         <Route path="/" element={
            <RequireAuth>
               <MainPage/>
            </RequireAuth>
         }/>
      </Routes>
   )
}


export default App
