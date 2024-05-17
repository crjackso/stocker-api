/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Int } from '@nestjs/graphql'

export type SortOrder = 'asc' | 'desc'

@ArgsType()
export class OrderBy<T> {
  property: SortOrder
}

@ArgsType()
export class PaginationArgs<T> {
  @Field((type) => Int)
  offset: number = 0

  @Field((type) => Int)
  limit: number = 10

  @Field((type) => OrderBy<T>)
  orderBy: {
    [Property in keyof T]?: SortOrder
  }
}
