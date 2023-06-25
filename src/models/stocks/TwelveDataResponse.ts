class TwelveDataResponse {
  public symbol: string
  public close: number
  public previous_close: string
  public timestamp: number

  public price(): number {
    return this.close
  }
}

export default TwelveDataResponse
