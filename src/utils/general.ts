
export const groupBy = (x: Array<any>, f: Function) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {})

export const toCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(value)
}
