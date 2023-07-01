class StockDetails {
  constructor({ companyName, ticker, logoUrl }: { companyName: string; ticker: string; logoUrl: string }) {
    this.logoUrl = logoUrl
    this.companyName = companyName
    this.ticker = ticker
  }

  logoUrl: string
  companyName: string
  ticker: string

  public fullName() {
    return `(${this.ticker}) ${this.companyName}`
  }
}

export default StockDetails
