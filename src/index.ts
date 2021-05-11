import {MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constants'

const db = async () => {
  try {
    const orm = await MikroORM.init({
      entities:[],
      dbName: 'postgres',
      user: 'postgres',
      password: 'user',
      type: 'postgresql',
      debug: !__prod__
    }) 
  } 
  catch (err) {
    console.log(err.message)  
  }
}
db()