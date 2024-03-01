import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  find(@Param('id') id: string): any {
    return this.userService.getUser(parseInt(id))
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): any {
    return this.userService.createUser(dto)
  }
}
