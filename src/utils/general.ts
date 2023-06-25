export const groupBy = (x: Array<any>, f: (a, b, c) => any) =>
  x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {})

export const toCurrency = (value: number): string => {
  if (!value) {
    return null
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return formatter.format(value)
}

function uniq(strings: string[]): string[] {
  return [...new Set(trimmedStrings(strings))]
}

function formattedTypes(types: string[]): string {
  return types.join(' or ')
}

function raiseExpectedTypesError(...types: string[]) {
  throw new Error(`Please enter a ${formattedTypes(types)}`)
}

function trimmedStrings(strings: string[]): string[] {
  const trimmed: string[] = []
  strings.forEach((str) => {
    let value: string

    try {
      value = str?.trim()
    } catch (error) {
      raiseExpectedTypesError('string', 'string[]')
    }

    if (value) {
      trimmed.push(value)
    }
  })

  return trimmed
}

export function uniqStrings<T>(key: T): T {
  if (Array.isArray(key)) {
    return uniq(key) as T
  } else if (typeof key === 'string') {
    return uniq(key.split(',')).join(',') as T
  } else {
    raiseExpectedTypesError('string', 'string[]')
  }
}
