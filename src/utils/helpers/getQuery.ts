import { TSortStatus, TTabValue } from "../types";

type TGetQuery = {
   pagination: number
   currentTab: TTabValue
   sortStatus?: TSortStatus
}

export default function getQuery( { pagination, currentTab, sortStatus }: TGetQuery ) {
   return `?pagination=${ pagination }&tab=${ currentTab }` + (sortStatus ? `&sort=${ sortStatus }` : '')
}