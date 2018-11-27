// tslint:disable:no-magic-numbers
import { Enum, identity, noop, tuple } from '../../utils'

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
      // tslint:disable:no-unused-variable
      const test: AnswerResponse = AnswerResponse.Yes
      const test2: AnswerResponse = 'Yes'
      // $ExpectError
      // @ts-ignore
      const test3: AnswerResponse = 'blah'
    } catch (e) {
      expect(e).toBeTruthy()
    }

    try {
      // tslint:disable:no-unused-variable
      const test: Colors = Colors.BLUE
      const test2: Colors = 'GREEN'
      // $ExpectError
      // @ts-ignore
      const test3: Colors = 'blah'
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })

  it(`should create implicit tuple array with proper tuple types`, () => {
    // $ExpectType (string | number | boolean)[]
    const testWidened = ['one', 1, false]

    // $ExpectType [string, number, boolean]
    const testProperTuple = tuple('one', 1, false)

    type ProperTuple = typeof testProperTuple
    const properTuple: ProperTuple = ['hello', 0, true]

    expect(properTuple).toEqual(['hello', 0, true])

    // $ExpectError
    // @ts-ignore
    const properTupleWithError: ProperTuple = [{}, 'hello', true]
    expect(properTuple).not.toEqual(properTupleWithError)

    type TupleViaUnion = typeof testWidened
    const noErrorOnWidened: TupleViaUnion = [true, false, 'what?', -1]

    expect([0, 0, 0] as TupleViaUnion).not.toEqual(noErrorOnWidened)
  })
})
