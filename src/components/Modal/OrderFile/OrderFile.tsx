import WithModalTitle from "../WithModalTitle/WithModalTitle";
import DropZone from "../OrderManually/DropZone";
import { read, utils } from "xlsx";
import { thunkGetOrders } from "../../../redux/slices/tableOrdersSlice";
import changeAttr from "../../../utils/helpers/changeAttr";
import { useAppDispatch } from "../../../redux/store";
import { TOrderExel } from "../../../utils/types";


function deleteDuplicate<T>( arr: T[] ): string[] {
   const arrToJson = arr.map( el => JSON.stringify( el ) )
   return [ ...new Set( arrToJson ) ].map( el => JSON.parse( el ) )
}


function OrderFile() {
   const dispatch = useAppDispatch()

   async function submitHandler( files: File[] ) {
      const filesData = await Promise.all( files.map( f => f.arrayBuffer() ) )

      const orders = filesData.map( f => {
         const wb = read( f )
         return utils.sheet_to_json( wb.Sheets[wb.SheetNames[0]] )
      } ).flat() as TOrderExel[]

      dispatch( thunkGetOrders( {
         method: 'POST',
         query: '/xlsx',
         payload: changeAttr( deleteDuplicate( orders ) )
      } ) )
   }


   return (
      <div>
         <WithModalTitle title={ 'Импортировать файл' }>
            <DropZone
               accept={ { 'application/vnd.ms-excel': [ '.xls', '.xlsx' ] } }
               dropzoneDescription={ 'Перетащите файл сюда (формат XLS до 5 МБ)' }
               submitHandler={ submitHandler }
            />
         </WithModalTitle>

      </div>
   )
}


export default OrderFile