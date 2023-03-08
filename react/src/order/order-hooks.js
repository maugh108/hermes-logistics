import { useQuery } from "@apollo/client"
import { FETCH_ORDERS } from "./order-queries"
export const useFetchOrder = () => {
    const result = useQuery(FETCH_ORDERS)
    return result
}




