import { User } from '@app/graphql'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class UserResolver {
  @Query()
  async getUser(@Args('id') id: number): Promise<User> {
    return {
      id,
      username: 'crjackso',
      firstName: 'Chris',
      lastName: 'Jackson',
      createdAt: new Date()
    }
  }
}
