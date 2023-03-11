import { useQuery } from "@apollo/client"
import { FETCH_USERS } from "./user-queries"
export const useFetchUsers = () => {
    const result = useQuery(FETCH_USERS)
    return result
}


