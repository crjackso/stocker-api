import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { CreateUserDto } from './dto'
import { UserWhereInput } from './graphql/inputs/user-where.input'
import { SecureUser } from './types'

@Injectable()
export class UserService {
  static pageLimit = 10

  constructor(readonly prisma: PrismaService) {}

  async getUser(id: number): Promise<SecureUser> {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async createUser(dto: CreateUserDto): Promise<SecureUser> {
    const password = await argon2.hash(dto.password)

    return await this.prisma.user.create({
      data: {
        ...dto,
        password
      }
    })
  }

  async getAllUsers(where: UserWhereInput): Promise<SecureUser[]> {
    return await this.prisma.user.findMany({
      where
    })
  }
}
