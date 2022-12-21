import s from './TableContainer.module.scss'
import Table from "@/components/Table/Table.jsx";


function TableContainer() {

   return (
      <div className={ s.TableContainer }>
         <h1 className={s.TableContainer__title}>Заявки</h1>
         <Table/>
      </div>
   )
}

export default TableContainer