import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const parseDate = (timestamp: string | dayjs.Dayjs | Date | undefined, utc = false) => {
  if (!timestamp) return undefined
  const date = dayjs(timestamp)
  return utc ? date.utc() : date
}

export const toDate = (timestamp: string | dayjs.Dayjs | Date | undefined) => {
  return parseDate(timestamp)?.toDate()
}

export const fromUnix = (date: number): Date => {
  return dayjs.unix(date).toDate()
}
