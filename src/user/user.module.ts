import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
// import { PrismaService } from '@app/prisma.service'

@Module({
  controllers: [UserController],
  // providers: [UserService, PrismaService]
  providers: [UserService]
})
export class UserModule {}
