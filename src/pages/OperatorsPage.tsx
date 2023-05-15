import { Button } from "@megafon/ui-core";
import s from "./MainPage.module.scss";
import { ReactComponent as DownloadIcon } from '@megafon/ui-icons/basic-24-download_24.svg';
import TableContainer from "../components/TableOperators/TableContainer/TableContainer";
import useQuery from "../hooks/useQuery";
import { useEffect } from "react";
import { request } from "../utils/api";
import downloadExel from "../utils/helpers/downloadExel";
import useAlert from "../hooks/useAlert";
import useOperatorsRequest from "../hooks/useOperatorsRequest";


function OperatorsPage() {
   const { getOperators } = useOperatorsRequest()
   const { alertWarning } = useAlert()
   const query = useQuery( 'tableOperators' )

   // получить данные таблицу
   useEffect( () => {
      getOperators( query )
   }, [ query ] )

   async function download() {
      const { data } = await request( `operators/xlsx` )
      downloadExel( data, 'Операторы.xlsx', alertWarning )
   }


   return (
      <>
         <TableContainer/>
         {/*@ts-ignore*/ }
         <Button
            theme="purple"
            icon={ <DownloadIcon/> }
            className={ s.MainPage__download_btn }
            onClick={ download }
         >
            Выгрузить операторов в .XLS
         </Button>
      </>
   )
}


export default OperatorsPage;