import { User } from '@app/graphql'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  async getUser(@Args('id') id: number): Promise<User> {
    return await this.userService.getUser(id)
  }
}
