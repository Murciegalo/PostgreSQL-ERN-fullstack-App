import {MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroOrmConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/Post'

const main = async () => {
  try {
    const orm = await MikroORM.init(mikroOrmConfig) 
    await orm.getMigrator().up()  // Migrations automated
    
    const app = express()
    
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver],
        validate: false
      }),
      context: () => ({em: orm.em})
    })

    apolloServer.applyMiddleware({app})
    
    app.listen(4000, () => {
      console.log('Listen at port: 4000')
    })
  } 
  catch (err) {
    console.log(err.message)  
  }
}
main()