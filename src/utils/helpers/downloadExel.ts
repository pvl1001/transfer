import { utils, writeFile } from "xlsx";

function downloadExel<T>( arr: T[], filename: string ): void {
   const wb = utils.book_new()
   const ws = utils.json_to_sheet( arr )

   utils.book_append_sheet( wb, ws )
   if ( arr.length ) writeFile( wb, filename )
   else alert( 'Список пуст' )
}

export default downloadExel;