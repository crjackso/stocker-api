import { TwelveDataPreviousCloseAttrs } from '../types'

class TwelveDataPreviousClose {
  constructor(attributes: TwelveDataPreviousCloseAttrs) {
    for (const key in attributes) {
      this[key] = attributes[key]
    }
  }
}

export default TwelveDataPreviousClose
