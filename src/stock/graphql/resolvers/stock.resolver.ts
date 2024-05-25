import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import { StockService } from '../../stock.service'
import { StockCreateInput, StockUpdateInput, StockWhereInput } from '../inputs'
import { Stock } from '@prisma/client'
import StockType from '../types/stock.type'

@Resolver(() => StockType)
export class StockResolver {
  constructor(private stockService: StockService) {}

  @Query(() => StockType, { nullable: true })
  async getStock(@Args('tickerSymbol') tickerSymbol: string): Promise<StockType> {
    return await this.stockService.get(tickerSymbol?.trim().toUpperCase())
  }

  @Query(() => [StockType])
  async getStocks(
    @Args('input', { type: () => StockWhereInput })
    where: StockWhereInput
  ): Promise<StockType[]> {
    return await this.stockService.getAll(where)
  }

  @Mutation(() => StockType)
  async createStock(
    @Args('input', { type: () => StockCreateInput })
    stock: StockCreateInput
  ): Promise<Stock> {
    return this.stockService.create(stock)
  }

  @Mutation(() => StockType, { description: 'Performs an upsert of the given stock entry' })
  async upsertStock(
    @Args('input', { type: () => StockUpdateInput })
    stock: StockUpdateInput
  ): Promise<Stock> {
    return this.stockService.upsert(stock)
  }
}
