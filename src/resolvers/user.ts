import {Arg, Ctx, Field, InputType, Mutation, Resolver} from 'type-graphql'
import { User } from '../entities/User'
import {MyContext} from '../types'
import argon2 from 'argon2'


@InputType()
class UserSignUp {
  @Field()
  username: string
  @Field()
  password: string
}

@Resolver()
export class UserResolver{
  @Mutation(() => User)
    async register(
      @Ctx() {em}: MyContext,
      @Arg('userInputs') userInputs: UserSignUp
      ){
        const hashedP = await argon2.hash(userInputs.password)
        const user = em.create(User, {
          username: userInputs.username, 
          password: hashedP
        })
        await em.persistAndFlush(user)
        return user
  }
}
  