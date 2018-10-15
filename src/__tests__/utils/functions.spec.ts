// tslint:disable:no-magic-numbers
import { Enum, identity, noop } from '../../utils'

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

  it(`should create type safe enums via object map`, () => {
    // $ExpectType Readonly<{ No: "No"; Yes: "Yes"; }>
    const AnswerResponse = Enum('No', 'Yes')

    expect(AnswerResponse).toEqual({ No: 'No', Yes: 'Yes' })

    // $ExpectType Readonly<{ RED: "RED"; GREEN: "GREEN"; BLUE: "BLUE"; }>
    const Colors = Enum('RED', 'GREEN', 'BLUE')

    expect(Colors).toEqual({ RED: 'RED', GREEN: 'GREEN', BLUE: 'BLUE' })
  })
})
