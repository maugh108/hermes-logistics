import express from 'express'
import {  graphqlHTTP } from 'express-graphql'
import { buildSchema  } from 'graphql'
import schema from  './schema'
import {connect} from './database'
const PORT = 3000 

const app = express()
connect()
const root = {
    hello: () => {
      return 'Hello world!';
    },
  };
  
/**
 * Return a graphql tool
 */
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  
app.get('/', (req, res)=>{
    res.json({
        message: 'Hello World'
    })
})
app.listen(PORT, () => console.log(`Server port listen on port ${PORT}`))