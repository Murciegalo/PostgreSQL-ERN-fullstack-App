import {Arg, Ctx, Mutation, Resolver} from 'type-graphql'
import { User } from '../entities/User'
import {MyContext} from '../types'


@Resolver()
export class UserResolver{
  @Mutation(() => User)
    async createUser(
      @Ctx() {em}: MyContext,
      @Arg('username', () => String ) username: string ,
      @Arg('password', () => String ) password: string 
      ){
        const user = em.create(User, {username, password})
        await em.persistAndFlush(user)
        return user
  }
}
  