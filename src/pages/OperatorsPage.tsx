import { Button } from "@megafon/ui-core";
import s from "./MainPage.module.scss";
import { ReactComponent as DownloadIcon } from '@megafon/ui-icons/basic-24-download_24.svg';
import TableContainer from "../components/TableOperators/TableContainer/TableContainer";
import useQuery from "../hooks/useQuery";
import { useEffect } from "react";
import { thunkGetOperators } from "../redux/slices/tableOperatorsSlice";
import { useAppDispatch } from "../redux/store";


function OperatorsPage() {
   const dispatch = useAppDispatch()
   const query = useQuery( 'tableOperators' )

   // получить данные таблицу
   useEffect( () => {
      dispatch( thunkGetOperators( { method: 'GET', query } ) )
   }, [ query ] )


   return (
      <>
         <TableContainer/>
         {/*@ts-ignore*/ }
         <Button
            theme="purple"
            icon={ <DownloadIcon/> }
            className={ s.MainPage__download_btn }
         >
            Выгрузить операторов в .XLS
         </Button>
      </>
   )
}


export default OperatorsPage;