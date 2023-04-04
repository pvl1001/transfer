// @ts-nocheck
import { FC, useCallback, useEffect, useState } from "react";
import CellSelect from "../CellSelect/CellSelect";
import CellInput from "../CellInput/CellInput";
import { Column, Row } from "react-table";


type TEditableCellProps = {
   value: string
   row: Row,
   column: Column,
   updateMyData: () => any
}

const EditableCell: FC<TEditableCellProps> = ( { value, row, column, updateMyData } ) => {
   const initialValue = value
   // const initialValue = useAppSelector( state => state.tableOrders.orders[row.index][column.id])
   const { index } = row
   const { id, CellTitle, options, disabled } = column
   const [ inputValue, setInputValue ] = useState( initialValue )

   // onChange CellInput
   function onChange( e ) {
      setInputValue( e.target.value )
   }

   // Обновить внешние данные
   const onBlur = useCallback( () => {
      if ( initialValue !== inputValue ) updateMyData( index, id, inputValue )
   }, [ index, id, inputValue, initialValue ] )

   // Обновить внешние данные Select
   const onChangeSelect = useCallback( ( value ) => {
      updateMyData( index, id, value )
   }, [ index, id, value, initialValue ] )

   // Очистить поле input
   function onClear( e ) {
      e.preventDefault()
      setInputValue( '' )
   }

   // Если начальное значение изменено внешне, синхронизируйте его с нашим состоянием.
   useEffect( () => {
      setInputValue( initialValue )
   }, [ initialValue ] )


   return (
      options
         ? <CellSelect
            onChange={ onChangeSelect }
            value={ inputValue }
            CellTitle={ CellTitle }
            options={ options }
         />
         : <CellInput
            value={ inputValue }
            CellTitle={ CellTitle }
            onChange={ onChange }
            onBlur={ onBlur }
            onClear={ onClear }
            disabled={ disabled }
         />
   )
}

// Установите наш редактируемый модуль визуализации ячеек в качестве средства визуализации ячеек по умолчанию.
const defaultColumn = {
   Cell: EditableCell,
}

export default defaultColumn
