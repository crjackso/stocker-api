import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLEmailAddress } from 'graphql-scalars'

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number

  @Field(() => GraphQLEmailAddress)
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  password: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
