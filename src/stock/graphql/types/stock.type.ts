import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { Transform } from 'class-transformer'
import { AssetType } from './assetType.enum'

@ObjectType()
export default class StockType {
  @Field(() => Int)
  id: number

  @Field()
  companyName: string

  @Field()
  @Transform(({ value }) => (value.trim() === '' ? null : value.trim()))
  tickerSymbol: string

  @Field()
  lastPrice: number

  @Field(() => Date)
  lastPriceAsOfDate: Date

  @Field(() => String, { nullable: true })
  logoUrl?: string

  @Field(() => AssetType, { nullable: true })
  assetType: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Float, { nullable: true })
  fiftyTwoWeekLow?: number

  @Field(() => Float, { nullable: true })
  fiftyTwoWeekHigh?: number
}
