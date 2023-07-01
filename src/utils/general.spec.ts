import { uniqStrings, toCurrency } from './general'

describe('general', () => {
  describe('uniqStrings', () => {
    describe('when a comma-delimited string is given', () => {
      it('returns uniq, comma-delimited string', () => {
        const actual = uniqStrings('foo,bar, bar,   bar')

        expect(actual).toEqual(['FOO', 'BAR'])
      })
    })

    describe('when an empty string is given', () => {
      it('returns an empty array', () => {
        expect(uniqStrings('')).toEqual([])
      })
    })

    describe('when an array of strings is given', () => {
      it('returns a uniq array of strings', () => {
        const actual = uniqStrings([' MPW ', 'O ', '  OHI ', ' ', 'TGT'])
        expect(actual).toEqual(expect.arrayContaining(['MPW', 'O', 'OHI', 'TGT']))
      })
    })

    describe('returns the type given', () => {
      const actual = uniqStrings('A,A,B,C,D, D ')

      expect(actual).toEqual(['A', 'B', 'C', 'D'])
    })

    it('returns uppercased strings', () => {
      expect(uniqStrings('gpn, voo')).toEqual(['GPN', 'VOO'])
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
