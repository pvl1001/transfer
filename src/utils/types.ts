import { ReactNode } from "react";

export type TTypeOrder = {
   id: string
   img: string
   name: string
   description: string
}

export type TTableMatchingColumnData = {
   Header: string
   CellTitle: string
   accessor: string, // accessor is the "key" in the data
   tooltip: string,
}

export type TTableMatchingHeadData = {
   number: string
   prevSeller: string
   nextSeller: string
   contributed: string
   name: string
   double: number
   attachments: string
}

export type TTab = {
   count: number
   title: 'Все' | 'Не согласовано' | 'Согласовано' | 'Недавно добавленные'
}

export type TPagination = {
   totalPages: number
   activePage: number
   onChange: ( activePage: number ) => void
}

export type TPaginationBoxProps = {
   totalPages: number
   activePage: number
   className?: string
   children: ( childrenProps: TPagination ) => ReactNode
}
