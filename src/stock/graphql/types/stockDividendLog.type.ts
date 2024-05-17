import { Field, ObjectType } from '@nestjs/graphql'
import StockType from './stock.type'

@ObjectType()
export class StockDividendLogType {
  @Field()
  tickerSymbol: string

  @Field()
  cashAmount: number

  @Field(() => Date)
  payDate: Date

  @Field(() => Date, { nullable: true })
  exDividendDate: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => StockType, { nullable: true })
  stock: StockType
}
