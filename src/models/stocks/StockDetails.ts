class StockDetails {
  constructor({ companyName, tickerSymbol, logoUrl }: { companyName: string, tickerSymbol: string, logoUrl: string }) {
    this.logoUrl = logoUrl
    this.companyName = companyName
    this.tickerSymbol = tickerSymbol
  }

  logoUrl: string
  companyName: string
  tickerSymbol: string

  public fullName() {
    return `(${this.tickerSymbol}) ${this.companyName}`
  }
}

export default StockDetails
