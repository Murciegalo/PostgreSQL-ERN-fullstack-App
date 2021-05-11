import {MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constants'
import { Post } from './entities/Post'
import mikroOrmConfig from './mikro-orm.config'

const db = async () => {
  try {
    const orm = await MikroORM.init(mikroOrmConfig) 
    // Migrations automated
    await orm.getMigrator().up()
    // Save 1 post (TESTING PURPOSES)
    // const post = orm.em.create(Post, {title: 'Testing my DB connection'})
    // await orm.em.persistAndFlush(post)
    const posts = await orm.em.find(Post, {})
    console.log('ALL POSTS IN DB', posts)
  } 
  catch (err) {
    console.log(err.message)  
  }
}
db()