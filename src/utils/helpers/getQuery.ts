import { TSortStatus, TTabValue } from "../types";

type TGetQuery = {
   search?: string
   pagination: number
   currentTab: TTabValue
   sortStatus?: TSortStatus
}

export default function getQuery( { pagination, currentTab, sortStatus, search }: TGetQuery ) {
   return `?pagination=${ pagination }&tab=${ currentTab }&search=${ search }` + (sortStatus
      ? `&sort=${ sortStatus }`
      : '')
}