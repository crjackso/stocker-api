import { InputType, Field, Float } from '@nestjs/graphql'

@InputType()
export class StockCreateInput {
  @Field(() => String)
  companyName: string

  @Field(() => String)
  tickerSymbol: string

  @Field(() => Float)
  lastPrice: number

  @Field(() => Float)
  fiftyTwoWeekHigh: number

  @Field(() => Float)
  fiftyTwoWeekLow: number
}
