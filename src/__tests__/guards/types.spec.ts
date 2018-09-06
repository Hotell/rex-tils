import { GetEmpty } from '../../guards/types'

describe(`private types for type guards`, () => {
  describe(`Empty`, () => {
    it(`should properly narrow empty types`, () => {
      // $ExpectType {}
      type TestObj = GetEmpty<{ one: number }>
      const testObj: TestObj = {}
      expect(testObj).toEqual({})

      // $ExpectType never[]
      type TestArr = GetEmpty<['one', 'two']>
      const testArr: TestArr = []
      expect(testArr).toEqual([])

      // $ExpectType never[]
      type TestArr2 = GetEmpty<number[]>
      const testArr2: TestArr2 = []
      expect(testArr2).toEqual([])

      // $ExpectType ''
      type TestStr = GetEmpty<'hello'>
      const testStr: TestStr = ''
      expect(testStr).toEqual('')

      // $ExpectType ''
      type TestStr2 = GetEmpty<string>
      const testStr2: TestStr2 = ''
      expect(testStr2).toEqual('')

      // $ExpectType null
      type TestNull = GetEmpty<null>
      const testNull: TestNull = null
      expect(testNull).toBe(null)

      // $ExpectType undefined
      type TestUndefined = GetEmpty<undefined>
      const testUndefined: TestUndefined = undefined
      expect(testUndefined).toBe(undefined)

      // $ExpectType void
      type TestVoid = GetEmpty<void>
      const testVoid: TestVoid = void 0
      expect(testVoid).toBe(void 0)
    })
  })
})
