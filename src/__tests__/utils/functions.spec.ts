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
    // $ExpectType 'No' | 'Yes'
    type AnswerResponse = Enum<typeof AnswerResponse>
    // $ExpectType Readonly<{ No: "No"; Yes: "Yes"; }>
    const AnswerResponse = Enum('No', 'Yes')

    expect(AnswerResponse).toEqual({ No: 'No', Yes: 'Yes' })

    // $ExpectType 'RED' | 'GREEN' | 'BLUE'
    type Colors = Enum<typeof Colors>
    // $ExpectType Readonly<{ RED: "RED"; GREEN: "GREEN"; BLUE: "BLUE"; }>
    const Colors = Enum('RED', 'GREEN', 'BLUE')

    expect(Colors).toEqual({ RED: 'RED', GREEN: 'GREEN', BLUE: 'BLUE' })

    try {
      const test: AnswerResponse = AnswerResponse.Yes
      const test2: AnswerResponse = 'Yes'
      // $ExpectError
      // @ts-ignore
      const test3: AnswerResponse = 'blah'
    } catch (e) {
      expect(e).toBeTruthy()
    }

    try {
      const test: Colors = Colors.BLUE
      const test2: Colors = 'GREEN'
      // $ExpectError
      // @ts-ignore
      const test3: Colors = 'blah'
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})
