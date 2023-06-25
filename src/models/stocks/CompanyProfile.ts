class CompanyProfile {
  constructor({ name, ticker }: { name: string; ticker: string }) {
    this.name = name
    this.ticker = ticker
  }

  ticker: string
  name: string
}

export default CompanyProfile
