import { Field, InputType } from '@nestjs/graphql'
import { StringFilter } from './stringFilter.input'
import { QueryMode } from '../enums/queryMode.enum'

@InputType()
export class InsensitiveStringFilter extends StringFilter {
  @Field(() => String, { defaultValue: QueryMode.insensitive })
  mode: QueryMode.insensitive

  @Field(() => [String], { nullable: true })
  in?: string[] | undefined
}
