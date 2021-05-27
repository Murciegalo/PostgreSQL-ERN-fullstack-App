import {MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroOrmConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { UserResolver } from './resolvers/user'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { MyContext } from './types'

const main = async () => {
  try {
    const orm = await MikroORM.init(mikroOrmConfig) 
    await orm.getMigrator().up()  // Migrations automated
    
    const app = express()
    
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()
    app.use(
      session({
        name: 'Auth-',
        store: new RedisStore({ 
          client: redisClient,
          disableTouch: true 
        }),
        cookie: {
          maxAge: 1000 * 60 * 60,
          httpOnly: true, // h c
          sameSite: 'lax',
          secure: __prod__ // c only works in https
        },
        saveUninitialized: false,
        secret: 'adfasdfasfasdfasfasdfasdfsdf',
        resave: false,
      })
    )
    
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver, UserResolver],
        validate: false
      }),
      context: ({ req, res }): MyContext => ({em: orm.em, req, res})
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