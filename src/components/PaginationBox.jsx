import React from 'react'

function PaginationBox( { activePage, children, className, ...props } ) {
   const [ currentActivePage, setCurrentActivePage ] = React.useState( activePage )
   const childrenProps = {
      ...props,
      activePage: currentActivePage,
      onChange: setCurrentActivePage,
   }
   return <div className={ className }>{ children( childrenProps ) }</div>
}

export default PaginationBox