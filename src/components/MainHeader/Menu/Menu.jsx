import s from './Menu.module.scss'
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { signout } from "@/redux/slices/authSlice.js";


function Menu() {
   const $menu = useRef( null )
   const $dropdown = useRef( null )
   const dispatch = useDispatch()
   const [ isVisible, setIsVisible ] = useState( false )
   const activeClass = isVisible ? s.Menu__active : ''
   const username = 'Иванов Иван'
   const avatarname = getAvatarname( username )


   function getAvatarname( str ) {
      const arr = str.split( ' ' )
      return [ arr[0][0], arr[1][0] ].join( '' )
   }

   function clickMenuHandler() {
      setIsVisible( prev => !prev )
   }

   function clickOut( e ) {
      const isMenu = $menu.current.contains( e.target )
      const isDropdown = $dropdown.current.contains( e.target )
      if ( !isMenu && !isDropdown ) setIsVisible( false )
   }

   function clickOptionsHandler( e ) {
   }

   function clickExitHandler() {
      dispatch( signout() )
   }

   useEffect( () => {
      if ( isVisible ) {
         document.addEventListener( 'click', clickOut )
         return () => document.removeEventListener( 'click', clickOut )
      }
   }, [ isVisible ] )


   return (
      <div className={ s.Menu }>
         <button
            ref={ $menu }
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
               onClick={ clickOptionsHandler }
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