import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "../../redux/store";
import { Navigate, useLocation } from "react-router-dom";

const RequireRole: FC<PropsWithChildren> = ( { children } ) => {
   const auth = useAppSelector( state => state.auth )
   const location = useLocation()

   if ( auth.user?.role !== "Администратор" ) {
      return <Navigate to="/orders" state={ { from: location } } replace/>
   }

   return <>{ children }</>
}

export default RequireRole