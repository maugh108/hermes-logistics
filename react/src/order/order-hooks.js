import { useLazyQuery, useQuery } from "@apollo/client"
import { FETCH_ORDER, FETCH_ORDERS } from "./order-queries"
export const useFetchOrders = () => {
    const result = useQuery(FETCH_ORDERS)
    return result
}

export const useFetchOrder = (o) => {
    const result = useLazyQuery(FETCH_ORDER)
    return result
}




