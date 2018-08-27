// tslint:disable:no-magic-numbers
import { identity, noop } from '../../utils'

describe(`function utils`, () => {
  it(`should be just a no operation function`, () => {
    expect(noop()).toBe(undefined)
  })

  it(`should be a identity function with proper type flow`, () => {
    // $ExpectType 42
    const actual = identity(42)
    const expected = 42

    expect(actual).toBe(expected)

    // $ExpectType 'hello'
    expect(identity('hello')).toBe('hello')

    const fn = (name: string, age: number) =>
      `Name: ${name} is: ${age} years old`

    // $ExpectType (name: string, age: number) => string
    expect(identity(fn)).toBe(fn)
  })
})
