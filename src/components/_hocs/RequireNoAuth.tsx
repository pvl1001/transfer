import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "../../redux/store";
import { Navigate, useLocation } from "react-router-dom";

const RequireNoAuth: FC<PropsWithChildren> = ( { children } ) => {
   const auth = useAppSelector( state => state.auth )
   const location = useLocation()

   if ( auth.user ) {
      return <Navigate to="/orders" state={ { from: location.pathname } } replace/>
   }

   return <>{ children }</>
}

export default RequireNoAuth