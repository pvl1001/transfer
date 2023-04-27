import React from 'react';
import Checkbox from "../../components-ui/Checkbox/Checkbox";


const checkboxToggleHandler = ( hooks, setIsVisibleDeletePanel ) => {
   hooks.visibleColumns.push( (columns) => [
      {
         id: 'selection',
         Header: ( { getToggleAllRowsSelectedProps } ) => {
            return <div><Checkbox
               { ...getToggleAllRowsSelectedProps() }
            setIsVisibleDeletePanel = { setIsVisibleDeletePanel }
            /></div>
         },
         Cell: ( { row } ) =>
            <div><Checkbox
               { ...row.getToggleRowSelectedProps() }
               setIsVisibleDeletePanel={ setIsVisibleDeletePanel }/></div>,
      },
      ...columns,
   ] )
}


export default checkboxToggleHandler
