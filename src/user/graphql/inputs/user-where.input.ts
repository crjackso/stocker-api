import { DateTimeFilter, IntFilter, StringFilter } from '@app/utils/graphql/inputs'
import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, ValidateIf } from 'class-validator'

@InputType()
export class UserWhereInput {
  @Field(() => [UserWhereInput], { nullable: true })
  OR?: UserWhereInput[] | undefined

  @Field(() => [UserWhereInput], { nullable: true })
  AND?: UserWhereInput[] | undefined

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: UserWhereInput[] | undefined

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter | number

  @Field(() => StringFilter, { nullable: true })
  @ValidateIf((obj) => obj instanceof String)
  email?: StringFilter | string

  @Field(() => StringFilter, { nullable: true })
  @IsOptional()
  firstName?: StringFilter | string

  @Field(() => StringFilter, { nullable: true })
  @IsOptional()
  lastName?: StringFilter | undefined

  @Field(() => DateTimeFilter, { nullable: true })
  @IsOptional()
  createdAt?: DateTimeFilter | undefined
}
