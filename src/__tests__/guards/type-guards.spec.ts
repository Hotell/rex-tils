import {
  isArray,
  isBlank,
  isBoolean,
  isDate,
  isEmpty,
  isFunction,
  isNumber,
  isObject,
  isPresent,
  isPromise,
  isString,
} from '../../guards'

// tslint:disable:no-magic-numbers

// tslint:disable-next-line:no-empty
const noop = () => {}
const emptyArr = [] as any[]
const emptyObj = {}

describe(`type guards`, () => {
  describe(`isArray`, () => {
    it(`should return true if value is an Array`, () => {
      expect(isArray(123)).toBe(false)
      expect(isArray(emptyObj)).toBe(false)
      expect(isArray({ one: 1 })).toBe(false)

      expect(isArray(emptyArr)).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)

      const arrWithTypes = [1, 2, 3] as number[] | string
      const arrWithComplexTypes = [{ who: 'Me' }] as
        | Array<{ who: string }>
        | string

      if (isArray(arrWithTypes)) {
        // $ExpectType number[]
        expect(arrWithTypes[0].toString()).toBe('1')
      } else {
        // $ExpectType string
        expect(typeof arrWithTypes).toBe('string')
      }

      if (isArray(arrWithComplexTypes)) {
        // $ExpectType Array<{ who: string }>
        expect(arrWithComplexTypes[0].who).toBe('Me')
      } else {
        // $ExpectType string
        // @ts-ignore
        expect(arrWithComplexTypes[0].who).toThrow()
      }
    })
  })

  describe(`isObject`, () => {
    it(`should return false if value is not an object map`, () => {
      type MyMap = { who: string; age: number }
      const possibleValidObj = {
        who: 'John',
        age: 32,
      } as MyMap | string | boolean

      expect(isObject(123)).toBe(false)
      expect(isObject('hello')).toBe(false)
      expect(isObject(null)).toBe(false)
      expect(isObject(undefined)).toBe(false)
      expect(isObject(true)).toBe(false)
      expect(isObject(noop)).toBe(false)
      expect(isObject(emptyArr)).toBe(false)

      expect(isObject(emptyObj)).toBe(true)

      if (isObject<MyMap>(possibleValidObj)) {
        // $ExpectType {one:number}
        expect(possibleValidObj).toHaveProperty('age')
        const { age } = possibleValidObj
        expect(age).toBe(32)
      } else {
        // $ExpectType string | boolean
        expect(possibleValidObj).toThrow()
        // @ts-ignore
        const { one } = possibleValidObj
        expect(one).toThrow()
      }
    })
  })

  describe(`isFunction`, () => {
    it(`should return true if value is function`, () => {
      expect(isFunction(emptyArr)).toBe(false)
      expect(isFunction(emptyObj)).toBe(false)

      expect(isFunction(noop)).toBe(true)

      type FnDefinition = (count: number, who: string) => string

      const fnImplementation: FnDefinition | any[] = (
        count: number,
        who: string
      ) => {
        if (!isNumber(count) || !isString(who)) {
          throw new Error(`arguments doesn't match allowed types`)
        }

        return `${who}: ${count} times`
      }

      if (isFunction(fnImplementation)) {
        // $ExpectType (count: number, who: string) => `${who}: ${count} times`
        expect(typeof fnImplementation).toBe('function')
        expect(fnImplementation(3, 'Me')).toBe('Me: 3 times')
        // @ts-ignore
        expect(() => fnImplementation(true, 123)).toThrowError(
          `arguments doesn't match allowed types`
        )
      } else {
        // @ts-ignore
        expect(() => fnImplementation(3, 'Me')).toThrow()
      }
    })
  })

  describe(`isNumber`, () => {
    it(`should return true if value is number, NaN, Infinity`, () => {
      expect(isNumber(123)).toBe(true)
      expect(isNumber(NaN)).toBe(true)
      expect(isNumber(Infinity)).toBe(true)
      expect(isNumber(-1)).toBe(true)
      expect(isNumber('123')).toBe(false)

      // tslint:disable-next-line:prefer-const
      let narrowValue = 123 as number | { foo: () => {} }

      if (isNumber(narrowValue)) {
        // $ExpectType number
        expect(typeof narrowValue.toFixed).toBe('function')
      } else {
        // $ExpectType { foo: ()=>{} }
        // @ts-ignore
        expect(() => narrowValue.foo()).toThrow()
      }
    })
  })

  describe(`isBoolean`, () => {
    it(`should return true if value is boolean`, () => {
      expect(isBoolean(false)).toBe(true)
      expect(isBoolean(true)).toBe(true)

      expect(isBoolean('hello')).toBe(false)
      expect(isBoolean(-1)).toBe(false)
      expect(isBoolean(123)).toBe(false)
    })
  })

  describe(`isString`, () => {
    it(`should return true if value is string`, () => {
      expect(isString(false)).toBe(false)
      expect(isString(true)).toBe(false)
      expect(isString(-1)).toBe(false)
      expect(isString(123)).toBe(false)

      expect(isString('hello')).toBe(true)
      expect(isString('')).toBe(true)
    })
  })

  describe(`isPresent`, () => {
    it(`should return true if value is present (non nullable, non undefined)`, () => {
      expect(isPresent(false)).toBe(true)
      expect(isPresent(true)).toBe(true)
      expect(isPresent(-1)).toBe(true)
      expect(isPresent(123)).toBe(true)
      expect(isPresent('hello')).toBe(true)
      expect(isPresent('')).toBe(true)
      expect(isPresent(emptyArr)).toBe(true)
      expect(isPresent(emptyObj)).toBe(true)

      expect(isPresent(null)).toBe(false)
      expect(isPresent(undefined)).toBe(false)

      const value = 'wat' as undefined | null | string

      if (isPresent(value)) {
        expect(typeof value).toBe('string')
      } else {
        // $ExpectType null | undefined
        // @ts-ignore
        expect(() => value.toString()).toThrow()
      }
    })

    describe(`isBlank`, () => {
      it(`should return true if value is blank (non null or undefined)`, () => {
        expect(isBlank(false)).toBe(false)
        expect(isBlank(true)).toBe(false)
        expect(isBlank(-1)).toBe(false)
        expect(isBlank(123)).toBe(false)
        expect(isBlank('hello')).toBe(false)
        expect(isBlank('')).toBe(false)
        expect(isBlank(emptyArr)).toBe(false)
        expect(isBlank(emptyObj)).toBe(false)

        expect(isBlank(null)).toBe(true)
        expect(isBlank(undefined)).toBe(true)

        const value = null as undefined | null | string

        if (isBlank(value)) {
          // $ExpectType null | undefined
          // @ts-ignore
          expect(() => value.toString()).toThrow()
        } else {
          // $ExpectType string
          expect(typeof value).toBe('string')
          expect(() => value.toString()).toThrow()
        }
      })
    })

    describe(`isDate`, () => {
      it(`should return true if value is Date`, () => {
        expect(isDate('2018-09-02')).toBe(false)
        expect(isDate(Date.now())).toBe(false)
        expect(isDate(Date.parse('2018-09-02'))).toBe(false)

        expect(isDate(new Date())).toBe(true)
      })
    })

    describe(`isPromise`, () => {
      it(`should return true if value is Promise`, (done) => {
        const promiseViaCtor = new Promise((resolve) => resolve())
        const promiseResolved = Promise.resolve()
        const promiseRejected = () =>
          Promise.reject().catch(() => {
            done()
          })
        const observableLike = {
          subscribe: noop,
        }

        expect(isPromise(promiseViaCtor)).toBe(true)
        expect(isPromise(promiseResolved)).toBe(true)
        expect(isPromise(promiseRejected())).toBe(true)

        expect(isPromise(emptyObj)).toBe(false)
        expect(isPromise(emptyArr)).toBe(false)
        expect(isPromise(noop)).toBe(false)
        expect(isPromise(observableLike)).toBe(false)
      })
    })
  })

  describe(`isEmpty`, () => {
    it(`should return true for empty strings`, () => {
      const str = 'hello'

      expect(isEmpty('')).toBe(true)
      expect(isEmpty(str)).toBe(false)

      if (isEmpty(str)) {
        // $ExpectType never
        expect(str[1].toUpperCase()).toThrow()
      } else {
        // $ExpectType 'hello'
        expect(str).toHaveLength(5)
      }
    })

    it(`should return true for empty arrays`, () => {
      const arr = ['hello', 'world']

      expect(isEmpty(emptyArr)).toBe(true)

      if (isEmpty(arr)) {
        // $ExpectType never
        expect(arr[1]).toThrow()
      } else {
        // $ExpectType string[]
        expect(arr).toHaveLength(2)

        const [first, second] = arr
        expect(first).toBe('hello')
        expect(second).toBe('world')
      }
    })

    it(`should return true for empty objects`, () => {
      const obj = { one: 1, two: 2 }

      expect(isEmpty(emptyObj)).toBe(true)
      expect(isEmpty(obj)).toBe(false)

      if (isEmpty(obj)) {
        // $ExpectType never
        // @ts-ignore
        expect(obj.one.toString()).toThrow()
      } else {
        const { one, two } = obj
        expect({ one, two }).toEqual(obj)
        // $ExpectType { one: number; two: number }
        expect(obj).toHaveProperty('one')
        expect(obj).toHaveProperty('two')
      }
    })

    it(`should throw error when non supported values are checked for emptiness`, () => {
      // @ts-ignore
      expect(() => isEmpty(undefined)).toThrowError(
        'checked value must be type of string | array | object. You provided undefined'
      )

      // @ts-ignore
      expect(() => isEmpty(null)).toThrowError(
        'checked value must be type of string | array | object. You provided null'
      )

      // @ts-ignore
      expect(() => isEmpty(true)).toThrowError(
        'checked value must be type of string | array | object. You provided boolean'
      )

      // @ts-ignore
      expect(() => isEmpty(123)).toThrowError(
        'checked value must be type of string | array | object. You provided number'
      )

      // on `object` types we cannot constraint with proper type error, we would get runtime error though
      expect(() => isEmpty(noop)).toThrow(
        'checked value must be type of string | array | object. You provided function'
      )
    })
  })
})
