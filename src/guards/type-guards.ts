import { AnyFunction, Nullable } from '../types'

export const isBlank = <T>(value: T): value is Nullable<T> => value == null
export const isPresent = <T>(value: T): value is NonNullable<T> => value != null
export const isFunction = <T extends AnyFunction>(value: any): value is T =>
  typeof value === 'function'
export const isBoolean = (value: any): value is boolean =>
  typeof value === 'boolean'
export const isString = (value: any): value is string =>
  typeof value === 'string'
export const isNumber = (value: any): value is number =>
  typeof value === 'number'
export const isArray = <T>(value: any): value is Array<T> =>
  Array.isArray(value)

/**
 *
 * to get proper type object within if branch, you need to explicitly provide generic value otherwise it will be narrowed to `object` only
 *
 * @example
 * ```ts
 * type MyMap = { who: string; age: number }
 * declare const someObj: object | string | number
 *
 * if (isObject<MyMap>(someObj)) {
 *  // $ExpectType MyMap
 *  someObj
 * } else {
 *  // $ExpectType string | number
 *  someObj
 * }
 * ```
 */
export const isObject = <T extends object>(value: any): value is T =>
  value != null && !Array.isArray(value) && typeof value === 'object'

export const isDate = (value: any): value is Date =>
  value instanceof Date && !isNaN(+value)

export const isPromise = (value: any): value is PromiseLike<any> =>
  value &&
  typeof value.subscribe !== 'function' &&
  typeof value.then === 'function'

/**
 *
 * Checks if string OR array OR object are empty
 * If you provide another value to check it will throw an error
 */
export const isEmpty = <T extends string | object | any[]>(
  value: T
): value is never => {
  if (isString(value) || isArray(value)) {
    return value.length === 0
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  throw new Error(
    `checked value must be type of string | array | object. You provided ${
      // tslint:disable-next-line:strict-type-predicates
      value === null ? 'null' : typeof value
    }`
  )
}
