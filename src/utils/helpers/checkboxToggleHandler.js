import Checkbox from "../../components-ui/Checkbox/Checkbox";
import React from "react";

export const CheckboxToggleHandler = ( hooks, setIsVisibleDeletePanel ) => {
   hooks.visibleColumns.push( columns => [
      {
         id: 'selection',
         Header: ( { getToggleAllRowsSelectedProps } ) =>
            <div><Checkbox
               { ...getToggleAllRowsSelectedProps() }
               setIsVisibleDeletePanel={ setIsVisibleDeletePanel }/></div>,
         Cell: ( { row } ) =>
            <div><Checkbox
               { ...row.getToggleRowSelectedProps() }
               setIsVisibleDeletePanel={ setIsVisibleDeletePanel }/></div>,
      },
      ...columns,
   ] )
}
