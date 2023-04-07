import { ReactNode } from "react";

export type TTypeOrder = {
   id: string
   img: string
   name: string
   description: string
}

export type TColumn = {
   Header: string
   CellTitle: string
   accessor: string
   tooltip?: string
   options?: Array<string | number>
   disabled?: boolean
   sort?: any
}

export type TTab = {
   count: number
   title:
      'Все'
      | 'Не согласовано'
      | 'Согласовано'
      | 'Недавно добавленные'
    value: TTabValue
}

export type TTabValue = 'ordersAll' | 'ordersNoAgreed' | 'ordersAgreed'

export type TPagination = {
   totalPages: number
   activePage: number
   onChange: ( activePage: number ) => void
}

export type TPaginationResponse = {
   current: number
   total: number
}

export type TCount = {
   all: number
   agreed: number
   noagreed: number
}

export type TPaginationBoxProps = {
   totalPages: number
   activePage: number
   className?: string
   children: ( childrenProps: TPagination ) => ReactNode
}

export type TOrderFormStep1 = {
   author?: string
   ccmp: string
   crm: string
   msisnd: string
   status: string
   transfer: string
}

export type TOrderFormStep2 = {
   before_order_number: string
   responsible: string
   duplicate: number
   cause_transfer: string
}

export type TOrderFormStep3 = {
   ex_seller: string
   next_seller: string
}

export type TOrderFormUnion = TOrderFormStep1 | TOrderFormStep2 | TOrderFormStep3

export type TOrderResponse = TOrderFormUnion | {
   id: number
   updatedAt: string
   createdAt: string
   changed?: boolean
}

export type TThunkOrderResponse = {
   orders: TOrderResponse[],
   pagination: TPaginationResponse,
   ordersLength: number,
   count: TCount
   sortStatus: TSortStatus
}

export type TThunkStatus = null | 'loading' | 'success' | 'error'

export type TOperator = {
   name: string
   company: string
   department: string
   role: string
   supervisor: string
   phone: string
   email: string
}

export type TSortStatus = 'DESC' | 'ASC'
