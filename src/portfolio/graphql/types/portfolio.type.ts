import StockType from '@app/stock/graphql/types/stock.type'
import Stock from '@app/stock/models/Stock'
import { UserType } from '@app/user/graphql/types/user.type'
import User from '@app/user/models/User'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class PortfolioType {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field(() => UserType, { nullable: true })
  user?: User

  @Field(() => Int)
  userId: number

  @Field(() => [StockType], { nullable: true })
  stocks?: [Stock]
}
