import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import s from "../../pages/MainPage.module.scss";
import MainHeader from "../MainHeader/MainHeader";

const RequireAuth: FC<PropsWithChildren> = ( { children } ) => {
   const location = useLocation()
   const auth = useAppSelector( state => state.auth )

   if ( auth.user === null ) {
      return <Navigate to="/login" state={ { from: location.pathname } } replace/>
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

export default RequireAuth