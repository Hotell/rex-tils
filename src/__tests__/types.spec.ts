import { Omit } from '../types'

describe(`generic TS type utils`, () => {
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
