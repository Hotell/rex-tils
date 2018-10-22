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

/**
 * Supplement/Negative to Pick from standard tslib.d.ts
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * As the name hints, $Diff<A, B> is the type representing the set difference of A and B, i.e. A \ B, where A and B are both object types.
 */
export type Diff<T, K> = Pick<T, Exclude<keyof T, keyof K>>

/**
 * opposite of standard library `NonNullable`
 */
export type Nullable<T> = T extends null | undefined ? T : never

export type Primitive<T> = T extends object ? never : T
export type NonPrimitive<T> = T extends object ? T : never

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

/**
 * use this mapped typed for creating types for proper nominal type checking
 *
 * kudos to https://michalzalecki.com/nominal-typing-in-typescript/#approach-4-intersection-types-and-brands
 *
 * @example
 * ```ts
 * type USD = Brand<number, "USD">
 * type EUR = Brand<number, "EUR">
 *
 * const usd = 10 as USD
 * const eur = 10 as EUR
 *
 * const gross = (net: USD, tax: USD): USD => (net + tax) as USD
 *
 * gross(usd, usd); // ok
 * gross(eur, usd); // Type '"EUR"' is not assignable to type '"USD"'.
 * ```
 */
export type Brand<K, T> = K & { __brand: T }

/**
 * Pick key-values from Base provided by Condition generic type. Generic can be an union.
 *
 * **NOTE:**
 * It doesn't work for undefined | null values. for that use `PickWithType`
 *
 * @example
 * ```ts
 * type Person = { id: number; name: string; lastName: string; address: { street: string; nr: number; } load: () => Promise<Person> }
 *
 * // $ExpectType { id: number; name: string; lastName: string; }
 * type JsonPrimitive = PickWithTypeUnion<Person, number | string>
 * ```
 */
export type PickWithTypeUnion<Base, Condition> = Pick<
  Base,
  { [Key in keyof Base]: Base[Key] extends Condition ? Key : never }[keyof Base]
>

/**
 * Pick key-values from Base provided by Condition generic type. Generic needs to be one type from `null | undefined | object | string | number | boolean`
 *
 * @example
 * ```ts
 * type Person = { id: number; name: string; lastName: string; address: { street: string; nr: number; } load: () => Promise<Person> }
 *
 * // $ExpectType { id: number; }
 * type JsonPrimitive = PickWithTypeUnion<Person, number>
 *
 * // $ExpectType { street: string | null; city: string | null; }
 * type NullableValues = PickWithType<{ street: string | null; city: string | null; id?: string }, null > \
 * ```
 */
export type PickWithType<
  Base,
  Condition extends null | undefined | object | string | number | boolean
> = Pick<
  Base,
  {
    [Key in keyof Base]: Condition extends Extract<Base[Key], Condition>
      ? Key
      : never
  }[keyof Base]
>
