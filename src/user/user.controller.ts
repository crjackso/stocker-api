import { Controller, Get, Body, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client' // todo return business object?
import UserCreate from './userCreate'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  @Post()
  createUser(@Body() userCreate: UserCreate): Promise<User> {
    return this.userService.createUser(userCreate)
  }
}
