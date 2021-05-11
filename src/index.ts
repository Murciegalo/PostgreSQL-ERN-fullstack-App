import {MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroOrmConfig from './mikro-orm.config'
import express from 'express'

const main = async () => {
  try {
    const orm = await MikroORM.init(mikroOrmConfig) 
    await orm.getMigrator().up()  // Migrations automated
    const app = express()
    app.get('/', (_, res) => res.json({msg: 'Server On'}))
    app.listen(4000, () => {
      console.log('Listen at port: 4000')
    })
  } 
  catch (err) {
    console.log(err.message)  
  }
}
main()