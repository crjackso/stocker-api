import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto'
import { SecureUser } from './types'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  find(@Param('id') id: string): any {
    return this.userService.getUser(parseInt(id))
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<SecureUser> {
    return this.userService.createUser(dto)
  }
}
