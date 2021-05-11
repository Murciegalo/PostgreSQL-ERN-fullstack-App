import {MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constants'
import { Post } from './entities/Post'
import mikroOrmConfig from './mikro-orm.config'

const db = async () => {
  try {
    const orm = await MikroORM.init(mikroOrmConfig) 
    // Migrations automated
    await orm.getMigrator().up()
    const post = orm.em.create(Post, {title: 'Testing my DB connection'})
    await orm.em.persistAndFlush(post)
  } 
  catch (err) {
    console.log(err.message)  
  }
}
db()