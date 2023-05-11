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
   title:
      'Все'
      | 'Не согласовано'
      | 'Согласовано'
      | 'Недавно добавленные'
   count: number
   value: TTabValue
}

export type TTabValue = 'ordersAll' | 'ordersNoAgreed' | 'ordersAgreed' | 'operatorsAll' | 'operatorsNew'

export type TPaginationResponse = {
   current: number
   total: number
}

export type TOrdersCount = {
   all: number
   agreed: number
   noagreed: number
}

export type TOperatorsCount = {
   all: number
   new: number
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

export type TOrderFormUnion = TOrderFormStep1 & TOrderFormStep2 & TOrderFormStep3

export type TOrderResponse = TOrderFormUnion & {
   id: number
   updatedAt?: string
   createdAt: string
   changed?: boolean
   images: null | string
}

export type TOrderExel = {
   'CCMP': string
   'CRM': string
   'MSISND': string
   'Будущий продавец': string
   'Бывший продавец': string
   'Дата внесения': string
   'Дубли заявок': number
   'Кто внес позицию': string
   'Номер заявки': number
   'Ответственный': string
   'Причина отказа': string
   'Причина переноса': string
   'Согласование': 'Согласовано' | 'Не согласовано'
   'Что переносим': string
}


export type TThunkOrderResponse = {
   orders: TOrderResponse[],
   pagination: TPaginationResponse,
   ordersLength: number,
   count: TOrdersCount
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

export type TThunkOperatorsResponse = {
   operators: TOperator[]
   pagination: TPaginationResponse
   count: TOperatorsCount
}

export type TUser = {
   email: string
   name: string
   role: 'Администратор' | 'Старший оператор' | 'Оператор'
}

export type TFormData = {
   email: string,
   password: string
}
