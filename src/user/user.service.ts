// import { PrismaService } from '@app/prisma.service'
import { Injectable } from '@nestjs/common'
// import { User } from '@prisma/client'
// import UserCreate from './userCreate'

@Injectable()
export class UserService {
  constructor() {}
  // constructor(readonly prisma: PrismaService) {}

  // getAllUsers(): Promise<User[]> {
  //   return this.prisma.user.findMany()
  // }

  // createUser(userCreate: UserCreate): Promise<User> {
  //   const user = this.prisma.user.create({
  //     data: {
  //       name: userCreate.name,
  //       email: userCreate.email,
  //       hash: '23'
  //     }
  //   })

  //   return user
  // }
}
