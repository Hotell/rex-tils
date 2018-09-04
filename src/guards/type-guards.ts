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
export const isObject = <T extends object>(value: any): value is T =>
  value != null && !Array.isArray(value) && typeof value === 'object'

export const isDate = (value: any): value is Date =>
  value instanceof Date && !isNaN(+value)

export const isPromise = (value: any): value is PromiseLike<any> =>
  value &&
  typeof value.subscribe !== 'function' &&
  typeof value.then === 'function'
