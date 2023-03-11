import express from 'express'
import {  graphqlHTTP } from 'express-graphql'
import { buildSchema  } from 'graphql'
import schema from  './schema'
import {connect} from './database'
import cors from 'cors'
import {verifyToken} from './middlewares'
import { checkToken, defaultUser, login } from './loginControler'
const PORT = 3000 

const app = express()
app.use(cors());
app.use(express.json())
const allowedOrigins = ['http://localhost:5173','http://localhost:3000','http://127.0.0.1:5173'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
connect()
const root = {
    hello: () => {
      return 'Hello world!';
    },
  };
app.use('/login', login)
app.use('/check-token',  verifyToken, checkToken)
app.use('/default-admin', defaultUser)

/**
 * Return a graphql tool
 */
app.use('/graphql', verifyToken, graphqlHTTP({
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