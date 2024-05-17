import { InputType, Field, PartialType, Float } from '@nestjs/graphql'
import { StockCreateInput } from './stock-create.input'

@InputType()
export class StockUpdateInput extends PartialType(StockCreateInput) {
  @Field(() => String)
  tickerSymbol: string

  @Field(() => String, { nullable: true })
  companyName: string

  @Field(() => Float, { nullable: true })
  lastPrice: number

  @Field(() => Date)
  lastPriceAsOfDate: Date
}
