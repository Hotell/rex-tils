/**
 * use this type definition instead of `Function` type constructor
 */
export type AnyFunction = (...args: any[]) => any

/**
 * simple alias to save you keystrokes when defining JS typed object maps
 */
export type StringMap<T> = { [key: string]: T }

/**
 * alias for the construct signature that describes a type which can construct objects of the generic type T and whose constructor function accepts an arbitrary number of parameters of any type
 */
export type Constructor<T = {}> = new (...args: any[]) => T

export type Omit<T, K> = Pick<T, Exclude<keyof T, keyof K>>

/**
 * opposite of standard library `NonNullable`
 */
export type Nullable<T> = T extends null | undefined ? T : never

/**
 * Maybe types accept the provided type as well as null or undefined
 */
export type Maybe<T> = T | null | undefined

/**
 * extracts union type from tuple
 *
 * @example
 * ```ts
 * type Tuple = [number, string, boolean]
 * // $ExpectType number | string | boolean
 * type Test = UnionFromTuple<Tuple>
 * ```
 */
export type UnionFromTuple<T> = T extends (infer U)[] ? U : never

/**
 * `keyof` doesn't work/distribute on union types. This mapped type fixes this issue
 *
 * @example
 * ```ts
 * type SomeUnion = { one: number } | { three: string } | { four: boolean }
 * // $ExpectType 'one' | 'three' | 'four'
 * type Test = Keys<SomeUnion>
 * ```
 */
export type Keys<T> = T extends any ? keyof T : never

/**
 * gets proper known keys from object which contains index type `[key:string]: any`
 *
 * @example
 * ```ts
 * type MapWithIndexType = { one: number; two: string; [k: string]: any; }
 * // $ExpectType 'one' | 'two'
 * type Test = KnownKeys<MapWithIndexType>
 * ```
 */
export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U }
  ? U
  : never

/**
 * gets required only known keys from object which contains index type `[key:string]: any`
 *
 * @example
 * ```ts
 * type MapWithIndexType = { one: number; two?: string; [k: string]: any; }
 * // $ExpectType 'one'
 * type Test = RequiredKnownKeys<MapWithIndexType>
 * ```
 */
export type RequiredKnownKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? never : K
} extends { [_ in keyof T]: infer U }
  ? U
  : never

/**
 * gets optional only known keys from object which contains index type `[key:string]: any`
 *
 * @example
 * ```ts
 * type MapWithIndexType = { one: number; two?: string; [k: string]: any; }
 * // $ExpectType 'two'
 * type Test = OptionalKnownKeys<MapWithIndexType>
 * ```
 */
export type OptionalKnownKeys<T> = {
  [K in keyof T]: string extends K
    ? never
    : number extends K ? never : {} extends Pick<T, K> ? K : never
} extends { [_ in keyof T]: infer U }
  ? U
  : never
