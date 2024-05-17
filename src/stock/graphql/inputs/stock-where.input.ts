import {
  DateTimeFilter,
  IntFilter,
  InsensitiveStringFilter,
  StringFilter,
  FloatFilter
} from '@app/utils/graphql/inputs'
import { InputType, Field } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class StockWhereInput {
  @Field(() => [StockWhereInput], { nullable: true })
  OR?: StockWhereInput[] | undefined

  @Field(() => [StockWhereInput], { nullable: true })
  AND?: StockWhereInput[] | undefined

  @Field(() => [StockWhereInput], { nullable: true })
  NOT?: StockWhereInput[] | undefined

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter | number

  @Field(() => StringFilter, { nullable: true })
  @IsOptional()
  companyName?: StringFilter | string

  @Field(() => InsensitiveStringFilter, { nullable: true })
  @IsOptional()
  tickerSymbol?: InsensitiveStringFilter | string

  @Field(() => FloatFilter, { nullable: true })
  @IsOptional()
  lastPrice?: FloatFilter | undefined

  @Field(() => DateTimeFilter, { nullable: true })
  @IsOptional()
  createdAt?: DateTimeFilter | undefined
}
