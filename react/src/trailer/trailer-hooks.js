import {  useQuery } from "@apollo/client"
import { FETCH_TRAILERS } from "./trailer-queries"
export const useFetchTrailers = () => {
    const result = useQuery(FETCH_TRAILERS)
    return result
}




