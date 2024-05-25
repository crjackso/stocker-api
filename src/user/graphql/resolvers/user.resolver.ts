import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserService } from '../../user.service'
import { UserWhereInput } from '../inputs/user-where.input'
import { UserType } from '../types/user.type'
import { SecureUser } from '@app/user/types'

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType)
  async getUser(@Args('id') id: number): Promise<SecureUser> {
    return await this.userService.getUser(id)
  }

  @Query(() => [UserType])
  async getUsers(
    @Args('input', { type: () => UserWhereInput })
    where: UserWhereInput
  ): Promise<SecureUser[]> {
    return await this.userService.getAllUsers(where)
  }
}
