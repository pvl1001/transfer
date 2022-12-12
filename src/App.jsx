import * as React from "react";
import {
   Routes,
   Route,
} from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import TestPage from "./pages/TestPage.jsx";

function App() {

   return (
      <Routes>
         {/*<Route element={<Layout />}>*/ }
         <Route path="/" element={ <MainPage/> }/>
         <Route path="/test" element={ <TestPage/> }/>
         {/*<Route path="/login" element={<LoginPage />} />*/ }
         {/*   <Route*/ }
         {/*      path="/protected"*/ }
         {/*      element={*/ }
         {/*         <RequireAuth>*/ }
         {/*            <ProtectedPage />*/ }
         {/*         </RequireAuth>*/ }
         {/*      }*/ }
         {/*   />*/ }
         {/*</Route>*/ }
      </Routes>
   )
}


export default App
