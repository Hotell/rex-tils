import {
  AnyFunction,
  Brand,
  Diff,
  FunctionArgsTuple,
  Keys,
  KnownKeys,
  NonPrimitive,
  Omit,
  OptionalKnownKeys,
  PickWithType,
  PickWithTypeUnion,
  Primitive,
  RequiredKnownKeys,
  UnionFromTuple,
  Values,
} from '../types'

describe(`generic TS type utils`, () => {
  describe('Omit', () => {
    it(`should Omit properly`, () => {
      type A = {
        one: string
        two: number
        three: boolean
      }

      type R = Omit<A, 'two'>

      const obj: R = {
        one: '123',
        three: false,
      }

      expect(obj).toEqual(obj)
    })
  })
  describe('Diff', () => {
    it(`should Diff two object types properly`, () => {
      type A = {
        one: string
        two: number
        three: boolean
      }

      type B = {
        two: number
      }

      type R = Diff<A, B>

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

  describe(`FunctionArgs`, () => {
    it(`should infer tuple type from function arguments`, () => {
      const funcTestNoArgs = () => {
        return
      }
      const funcTestOneArgs = (one: number) => {
        return
      }
      const funcTestMultipleArgs = (
        one: number,
        two: string,
        three: boolean
      ) => {
        return
      }

      // $ExpectType []
      type TestNone = FunctionArgsTuple<typeof funcTestNoArgs>
      // $ExpectType [number]
      type TestOne = FunctionArgsTuple<typeof funcTestOneArgs>
      // $ExpectType [number, string, boolean]
      type TestMultiple = FunctionArgsTuple<typeof funcTestMultipleArgs>

      expect([] as TestNone).toEqual([])
      expect([1] as TestOne).toEqual([1])
      expect([1, 'hello', true] as TestMultiple).toEqual([1, 'hello', true])
    })
  })

  describe(`Values`, () => {
    // tslint:disable:no-magic-numbers
    it(`should return all object values as a union type`, () => {
      type Props = {
        name: string
        age: number
      }

      // The following two types are equivalent:
      // $ExpectType string | number
      type Prop$Values = Values<Props>

      // $ExpectType string
      const name: Prop$Values = 'Jon'
      // $ExpectType number
      const age: Prop$Values = 42

      // Error! function is not part of the union type
      // $ExpectError
      // @ts-ignore
      const fn: Prop$Values = () => {
        return
      }

      expect(name).toBe('Jon')
      expect(age).toBe(42)
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

  describe(`PickWith* family`, () => {
    it(`should extract only types from object by type condition`, () => {
      type Person = {
        id: number
        name: string
        lastName: string
        address: {
          street: string
          nr: number
        }
        load: () => Promise<Person>
      }

      // $ExpectType {id: number; name: string; lastName: string; }
      type JsonPrimitive = PickWithTypeUnion<Person, number | string>

      const jsonPrimitive: JsonPrimitive = {
        id: 1,
        lastName: 'foo',
        name: 'boo',
      }
      expect(jsonPrimitive).toBeTruthy()

      // $ExpectType {address: { street: string; nr: number }, load: () => Promise<Person>;}
      type JsonComplex = PickWithTypeUnion<Person, object>

      const jsonComplex: JsonComplex = {
        address: {
          nr: 123,
          street: 'dddd',
        },
        load: () => Promise.resolve({} as Person),
      }
      expect(jsonComplex).toBeTruthy()

      // $ExpectType {load: () => Promise<Person>;}
      type JsonFunctionOnly = PickWithTypeUnion<Person, AnyFunction>

      const jsonFunctionOnly: JsonFunctionOnly = {
        load: () => Promise.resolve({} as Person),
      }
      expect(jsonFunctionOnly).toBeTruthy()

      // $ExpectType { married: boolean; }
      type BooleanValuesOnly = PickWithType<
        {
          street: string | null
          married: boolean
          id?: string
        },
        boolean
      >

      const booleanValuesOnly: BooleanValuesOnly = {
        married: true,
      }
      expect(booleanValuesOnly).toBeTruthy()

      // $ExpectType { id?: string | undefined; }
      type OptionalValues = PickWithType<
        {
          street: string | null
          city: string | null
          id?: string
        },
        undefined
      >

      const optionalValuesOnly: OptionalValues = {
        id: '123',
      }
      expect(optionalValuesOnly).toBeTruthy()

      // $ExpectType { street: string | null; city: string | null; }
      type NullableValues = PickWithType<
        {
          street: string | null
          city: string | null
          id?: string
        },
        null
      >

      const nullableValues: NullableValues = {
        city: 'New Oakland',
        street: null,
      }
      expect(nullableValues).toBeTruthy()
    })
  })

  describe('standard lib mapped types extensions', () => {
    it(`should correctly narrow primitive types via Primitive<T>`, () => {
      type Test = boolean | number | [1, 2, 4] | string[] | { one: number }

      // $ExpectType boolean | number
      type Expected = Primitive<Test>

      const actual: Test = { one: 111 }
      // $ExpectError
      // @ts-ignore
      const expected: Expected = { one: 111 }

      expect(actual).toEqual(expected)
    })

    it(`should correctly narrow non-primitive types via NonPrimitive<T>`, () => {
      type Test = boolean | number | [1, 2, 4] | string[] | { one: number }

      // $ExpectType [1, 2, 4] | string[] | { one: number; }
      type Expected = NonPrimitive<Test>

      const actual: Test = 2222
      // $ExpectError
      // @ts-ignore
      const expected: Expected = 2222

      expect(actual).toBe(expected)
    })
  })
})
