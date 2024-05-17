import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from '../../user.service'
import { PrismaService } from '@app/prisma/prisma.service'

const mockUser = {
  id: 1,
  email: 'foo@bar.com'
}

const db = {
  user: {
    findUnique: jest.fn().mockResolvedValue(mockUser)
  }
}

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: PrismaService,
          useValue: db
        }
      ]
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
