import { PrismaService } from '@app/prisma/prisma.service'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto'
import * as argon2 from 'argon2'
import { isUniqueConstraintViolation } from '@app/prisma/utils'

@Injectable()
export class UserService {
  constructor(readonly prisma: PrismaService) {}

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new NotFoundException('User was not found in the system')
    }

    delete user.password

    return user
  }

  async createUser(dto: CreateUserDto) {
    const password = await argon2.hash(dto.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password
        }
      })

      return user
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new ForbiddenException('This email is already in the system')
      }

      throw error
    }
  }
}
