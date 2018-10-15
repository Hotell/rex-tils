import { UnionFromTuple } from '../types'

// tslint:disable-next-line:no-empty
export const noop = () => {}
export const identity = <T>(arg: T) => arg

/**
 * Enum function to create type safe immutable object map with runtime presence
 * @param args
 * @example
 * ```ts
 * // $ExpectType Readonly<{ No: "No"; Yes: "Yes"; }>
 * const AnswerResponse = Enum('No', 'Yes')
 *
 * // $ExpectType Readonly<{ RED: "RED"; GREEN: "GREEN"; BLUE: "BLUE"; }>
 * const Colors = Enum('RED', 'GREEN', 'BLUE')
 * ```
 */
export const Enum = <T extends string[]>(...args: T) => {
  return Object.freeze(args.reduce((acc, next) => {
    return {
      ...acc,
      [next]: next,
    }
  }, Object.create(null)) as { [P in UnionFromTuple<typeof args>]: P })
}
