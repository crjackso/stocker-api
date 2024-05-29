import { Resolver, Args, Query, Parent, ResolveField, Int } from '@nestjs/graphql'
import { PortfolioService } from '@app/portfolio/portfolio.service'
import PortfolioType from '../types/portfolio.type'
import { StockService } from '@app/stock/stock.service'
import { UserService } from '@app/user/user.service'

@Resolver(() => PortfolioType)
export class PortfolioResolver {
  constructor(
    private portfolioService: PortfolioService,
    private stockService: StockService,
    private userService: UserService
  ) { }

  @Query(() => PortfolioType, { nullable: true })
  async getPortfolio(@Args('id', { type: () => Int }) id: number): Promise<PortfolioType> {
    return await this.portfolioService.get(id)
  }

  @ResolveField()
  async user(@Parent() portfolio: PortfolioType) {
    return this.userService.getUser(portfolio.userId)
  }

  @ResolveField()
  async stocks(@Parent() portfolio: PortfolioType) {
    return await this.portfolioService.getStocks(portfolio.id)
  }
}
