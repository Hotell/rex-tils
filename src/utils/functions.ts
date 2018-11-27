import { UnionFromTuple } from '../types'

// tslint:disable-next-line:no-empty
export const noop = () => {}
export const identity = <T>(arg: T) => arg

/**
 * Implicitly create a tuple with proper tuple types instead of widened array of union types
 *
 * @see https://stackoverflow.com/questions/49729550/implicitly-create-a-tuple-in-typescript
 *
 * @example
 * ```ts
 * // $ExpectType (string | number | boolean)[]
 * const testWidened = ['one', 1, false]
 *
 * // $ExpectType [string, number, boolean]
 * const testProperTuple = tuple('one', 1, false)
 * ```
 *
 * @param args - function arguments
 */
export const tuple = <T extends any[]>(...args: T): T => args

/**
 * Enum function to create type safe immutable object map with runtime presence
 *
 * @param args - Enum keys
 *
 * @example
 *
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

/**
 * Use for getting literal type out of const myEnum = Enum(...) if you need it and export via token merge
 *
 * @example
 *
 * ```ts
 * // $ExpectType Readonly<{ No: "No"; Yes: "Yes"; }>
 * export const AnswerResponse = Enum('No', 'Yes')
 * // $ExpectType 'No' | 'Yes'
 * export type AnswerResponse = Enum(typeof AnswerResponse)
 *
 * // consumer.ts
 * import {AnswerResponse} from './enums'
 * export const respond = (recipient: string, message: AnswerResponse) => { }
 *
 * // usage.ts
 * import {respond} from './consumer'
 * import {AnswerResponse} from './enums'
 *
 * respond('Johnny 5','Yes')
 * respond('Johnny 5', AnswerResponse.No)
 * ```
 */
export type Enum<T extends object> = T[keyof T]
