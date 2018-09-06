import {
  Brand,
  Keys,
  KnownKeys,
  Omit,
  OptionalKnownKeys,
  RequiredKnownKeys,
  UnionFromTuple,
} from '../types'

describe(`generic TS type utils`, () => {
  describe('Omit', () => {
    it(`should Omit properly`, () => {
      type A = {
        one: string
        two: number
        three: boolean
      }

      type B = {
        two: number
      }

      type R = Omit<A, B>

      const obj: R = {
        one: '123',
        three: false,
      }

      expect(obj).toEqual(obj)
    })
  })

  describe(`UnionFromTuple`, () => {
    it(`should infer tuple types to union`, () => {
      type Tuple = [number, string, boolean]
      // $ExpectType number | string | boolean
      type Test = UnionFromTuple<Tuple>

      // tslint:disable-next-line:prefer-const
      let actual: Test = 'one'
      // tslint:disable-next-line:no-magic-numbers
      actual = 123
      actual = false

      expect(actual).toBe(false)
    })
  })

  describe(`Keys`, () => {
    it(`should return all keys even from union type`, () => {
      type SomeUnion = { one: number } | { three: string } | { four: boolean }
      // $ExpectType 'one' | 'three' | 'four'
      type Test = Keys<SomeUnion>

      // tslint:disable-next-line:prefer-const
      let actual: Test = 'one'
      actual = 'three'
      actual = 'four'

      expect(actual).toBe('four')
    })
  })

  describe('KnownKeys family', () => {
    it(`should get known keys only`, () => {
      type MapWithIndexType = { one: number; two: string; [k: string]: any }
      // $ExpectType 'one' | 'two'
      type Test = KnownKeys<MapWithIndexType>

      // tslint:disable-next-line:prefer-const
      let actual: Test = 'one'

      expect(actual).toBe('one')

      actual = 'two'

      expect(actual).toBe('two')
    })

    it(`should get know and required only keys`, () => {
      type MapWithIndexType = { one: number; two?: string; [k: string]: any }
      // $ExpectType 'one'
      type Test = RequiredKnownKeys<MapWithIndexType>

      const actual: Test = 'one'

      expect(actual).toBe('one')
    })

    it(`should get know and optional only keys`, () => {
      type MapWithIndexType = { one: number; two?: string; [k: string]: any }
      // $ExpectType 'two'
      type Test = OptionalKnownKeys<MapWithIndexType>

      const actual: Test = 'two'

      expect(actual).toBe('two')
    })
  })

  describe(`Brand`, () => {
    it(`should properly use nominal typing on brand like types`, () => {
      // tslint:disable:no-magic-numbers
      type USD = Brand<number, 'USD'>
      type EUR = Brand<number, 'EUR'>

      const usd = 10 as USD
      const eur = 10 as EUR

      function gross(net: USD, tax: USD): USD {
        return (net + tax) as USD
      }

      // tslint:disable-next-line:prefer-const
      let result: number

      result = gross(usd, usd) // ok
      // @ts-ignore
      result = gross(eur, usd) // Type '"EUR"' is not assignable to type '"USD"'.

      expect(result).toBe(20)
    })
  })
})
