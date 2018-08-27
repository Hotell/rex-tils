import { Empty } from '../../guards/types'

describe(`private types for type guards`, () => {
  describe(`Empty`, () => {
    it(`should properly narrow empty types`, () => {
      // $ExpectType {}
      type TestObj = Empty<{ one: number }>
      const testObj: TestObj = {}
      expect(testObj).toEqual({})

      // $ExpectType never[]
      type TestArr = Empty<['one', 'two']>
      const testArr: TestArr = []
      expect(testArr).toEqual([])

      // $ExpectType never[]
      type TestArr2 = Empty<number[]>
      const testArr2: TestArr2 = []
      expect(testArr2).toEqual([])

      // $ExpectType ''
      type TestStr = Empty<'hello'>
      const testStr: TestStr = ''
      expect(testStr).toEqual('')

      // $ExpectType ''
      type TestStr2 = Empty<string>
      const testStr2: TestStr2 = ''
      expect(testStr2).toEqual('')

      // $ExpectType null
      type TestNull = Empty<null>
      const testNull: TestNull = null
      expect(testNull).toBe(null)

      // $ExpectType undefined
      type TestUndefined = Empty<undefined>
      const testUndefined: TestUndefined = undefined
      expect(testUndefined).toBe(undefined)

      // $ExpectType void
      type TestVoid = Empty<void>
      const testVoid: TestVoid = void 0
      expect(testVoid).toBe(void 0)
    })
  })
})
