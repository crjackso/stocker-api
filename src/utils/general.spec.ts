import { uniqStrings, toCurrency } from './general'

describe('general', () => {
  describe('uniqStrings', () => {
    describe('when a comma-delimited string is given', () => {
      it('returns uniq, comma-delimited string', () => {
        const actual = uniqStrings<string>('foo,bar, bar,   bar')

        expect(actual).toEqual('foo,bar')
      })
    })

    describe('when an empty string is given', () => {
      it('returns an empty string', () => {
        expect(uniqStrings('')).toEqual('')
      })
    })

    describe('when an array of strings is given', () => {
      it('returns a uniq array of strings', () => {
        const actual = uniqStrings([' MPW ', 'O ', '  OHI ', ' ', 'TGT'])
        expect(actual).toEqual(expect.arrayContaining(['MPW', 'O', 'OHI', 'TGT']))
      })
    })

    describe('when an array of non-strings is given', () => {
      it('throws an error indicating expected type', () => {
        expect(() => uniqStrings([' MPW ', true, 2])).toThrowError('Please enter a string or string[]')
      })
    })

    describe('when a foreign type is given', () => {
      it('throws an error indicating expected type', () => {
        expect(() => uniqStrings(Boolean)).toThrowError('Please enter a string or string[]')
      })
    })
  })

  describe('toCurrency', () => {
    describe('when invalid input is given', () => {
      it('returns null', () => {
        expect(toCurrency(null)).toBeNull()
      })
    })

    describe('when valid currency value is given', () => {
      it('returns formatted USD response', () => {
        expect(toCurrency(10.1)).toEqual('$10.10')
      })
    })
  })
})
