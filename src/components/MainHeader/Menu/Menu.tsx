import s from './Menu.module.scss'
import { FC, useEffect, useRef, useState } from "react";
import { signout } from "../../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { deleteCookie } from "../../../utils/setCookie";


type TProps = {
   className?: string
}


const Menu: FC<TProps> = ( { className = '' } ) => {
   const dispatch = useAppDispatch()
   const { user } = useAppSelector( state => state.auth )
   const $menu = useRef<HTMLButtonElement>( null )
   const $dropdown = useRef<HTMLUListElement>( null )
   const [ isVisible, setIsVisible ] = useState( false )
   const activeClass = isVisible ? s.Menu__active : ''
   const username = user?.name
   const avatarname = username && getAvatarname( username )


   function getAvatarname( str: string ) {
      const arr = str.split( ' ' )
      return arr.length === 1 ? [ arr[0][0] ] : [ arr[0][0], arr[1][0] ].join( '' )
   }

   function clickMenuHandler() {
      setIsVisible( prev => !prev )
   }

   function clickOut( e: MouseEvent ) {
      const isMenu = $menu.current?.contains( e.target as HTMLElement )
      const isDropdown = $dropdown.current?.contains( e.target as HTMLElement )
      if ( !isMenu && !isDropdown ) setIsVisible( false )
   }

   function clickExitHandler() {
      deleteCookie('user')
      dispatch( signout() )
   }

   useEffect( () => {
      if ( isVisible ) {
         document.addEventListener( 'click', clickOut )
         return () => document.removeEventListener( 'click', clickOut )
      }
   }, [ isVisible ] )


   return (
      <div className={ `${ s.Menu } ${ className }` }>
         <button
            ref={ $menu }
            type="button"
            className={ `${ s.Menu__btn } ${ activeClass }` }
            onClick={ clickMenuHandler }
         >
            <div className={ s.Menu__avatar }>{ avatarname }</div>
            <div className={ s.Menu__username }>{ username }</div>
            <div className={ s.Menu__icon }/>
         </button>

         <ul
            ref={ $dropdown }
            className={ s.Menu__dropdown }
         >
            <li
               className={ s.Menu__dropdown_item }
               // onClick={ clickOptionsHandler }
            >Настройки
            </li>
            <li
               className={ `${ s.Menu__dropdown_item } ${ s.Menu__dropdown_exit }` }
               onClick={ clickExitHandler }
            >Выйти
            </li>
         </ul>

      </div>

   )
}


export default Menu