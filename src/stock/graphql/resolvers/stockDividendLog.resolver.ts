import { Resolver, Args, Int, Query, Parent, ResolveField } from '@nestjs/graphql'
import { DividendService } from '../../dividend.service'
import { StockDividendLogType } from '../types/stockDividendLog.type'
import StockDividendLog from '@app/stock/models/StockDividendLog'
import { DividendWhereInput } from '../inputs/dividend-where.input'
import { StockService } from '@app/stock/stock.service'

@Resolver(() => StockDividendLogType)
export class StockDividendLogResolver {
  constructor(
    private dividendService: DividendService,
    private stockService: StockService
  ) { }

  @Query(() => StockDividendLogType, { nullable: true })
  async getDividend(@Args('id', { type: () => Int }) id: number): Promise<StockDividendLog> {
    return await this.dividendService.get(id)
  }

  @Query(() => [StockDividendLogType], { nullable: true })
  async getDividends(
    @Args('input', { type: () => DividendWhereInput }) where: DividendWhereInput
  ): Promise<StockDividendLog[]> {
    return await this.dividendService.getAll(where)
  }

  @ResolveField()
  async stock(@Parent() dividendLog: StockDividendLogType) {
    return this.stockService.get(dividendLog.tickerSymbol)
  }
}
