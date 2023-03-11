import { useQuery } from "@apollo/client"
import { FETCH_TRUCKS } from "./truck-queries"

export const useFetchTrucks = () => {
    const result = useQuery(FETCH_TRUCKS)
    return result
}

