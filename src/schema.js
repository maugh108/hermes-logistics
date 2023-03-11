import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'
import typeDefs from './types'

export default makeExecutableSchema({
    typeDefs ,
    resolvers,
    context:({req})=>{
        if(null != 1){
            throw Error("Authentication must use Bearer.");
        }
    }
})