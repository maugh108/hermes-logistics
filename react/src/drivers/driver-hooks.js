import { useQuery } from "@apollo/client"
import { FETCH_DRIVERS } from "./driver.queries"

export const useFetchDrivers = () => {
    const result = useQuery(FETCH_DRIVERS)
    return result
}

