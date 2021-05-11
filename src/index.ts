import {MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constants'
import { Post } from './entities/Post'

const db = async () => {
  try {
    const orm = await MikroORM.init({
      entities:[Post],
      dbName: 'postgres',
      user: 'postgres',
      password: 'user',
      type: 'postgresql',
      debug: !__prod__
    }) 

    const post = orm.em.create(Post, {title: 'Testing my DB connection'})
    await orm.em.persistAndFlush(post)
  } 
  catch (err) {
    console.log(err.message)  
  }
}
db()