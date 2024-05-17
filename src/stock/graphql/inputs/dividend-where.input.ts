import { DateTimeFilter, InsensitiveStringFilter } from '@app/utils/graphql/inputs'
import { InputType, Field } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class DividendWhereInput {
  @Field(() => InsensitiveStringFilter, { nullable: true })
  @IsOptional()
  tickerSymbol?: InsensitiveStringFilter | string

  @Field(() => DateTimeFilter, { nullable: true })
  @IsOptional()
  payDate?: DateTimeFilter | string
}
