import { TwelveDataPreviousCloseAttrs } from '@app/twelve-data/types'
import TwelveDataPreviousClose from '@app/twelve-data/models/TwelveDataPreviousClose'

const defaultAttrs: TwelveDataPreviousCloseAttrs = {
  symbol: '',
  name: '',
  exchange: '',
  mic_code: '',
  currency: '',
  datetime: '',
  timestamp: 0,
  open: '',
  high: '',
  low: '',
  close: '',
  volume: '',
  previous_close: '',
  change: '',
  percent_change: '',
  average_volume: '',
  is_market_open: false,
  fifty_two_week: {
    low: '12.99',
    high: '29.99',
    low_change: '3.99',
    high_change: '9.99',
    low_change_percent: '0.03',
    high_change_percent: '1.08',
    range: '2.99'
  }
}

export const Vti = new TwelveDataPreviousClose({
  ...defaultAttrs,
  symbol: 'VTI',
  name: 'Vanguard Total Stock Market Index Fund',
  close: '214.98'
})
