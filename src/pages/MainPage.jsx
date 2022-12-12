import { useDispatch, useSelector } from "react-redux"
import { signout } from "../redux/slices/authSlice.js"

function MainPage() {
   const dispatch = useDispatch()
   const auth = useSelector( state => state.auth )

   function signoutHandler() {
      dispatch( signout() )
   }


   return (
      <div>
         <h1>Hi, { auth.login }!</h1>
         <button onClick={ signoutHandler } className="btn">
            Logout
         </button>
      </div>
   )
}

export default MainPage