import WithModalTitle from "../WithModalTitle/WithModalTitle";
import DropZone from "../OrderManually/DropZone";
import { read, utils } from "xlsx";
import { useAppDispatch } from "../../../redux/store";
import { TOrderExel } from "../../../utils/types";
import useOrdersRequest from "../../../hooks/useOrdersRequest";


function OrderFile() {
   const dispatch = useAppDispatch()
   const { uploadOrders } = useOrdersRequest()

   async function submitHandler( files: File[] ): Promise<any> {
      const filesData = await Promise.all( files.map( f => f.arrayBuffer() ) )

      const orders = filesData.map( f => {
         const wb = read( f )
         return utils.sheet_to_json( wb.Sheets[wb.SheetNames[0]] )
      } ).flat() as TOrderExel[]

      return uploadOrders( orders )
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