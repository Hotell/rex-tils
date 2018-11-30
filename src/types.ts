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

/**
 * Get only JS primitive types from a type
 */
export type Primitive<T> = T extends object ? never : T

/**
 * Get non JS primitive types from a type. Opposite of `Primitive`
 */
export type NonPrimitive<T> = T extends object ? T : never

/**
 * Maybe types accept the provided type as well as null or undefined
 */
export type Maybe<T> = T | null | undefined

/**
 * Obtain the return type of a constructor function type within array or object.
 * > Like native lib.d.ts `InstanceType` but for arrays/tuples or objects
 *
 * @example
 *
 * ```ts
 * class Foo { hello = 'world' }
 * class Moo { world = 'hello' }
 *
 * const arr: [typeof Foo, typeof Moo] = [Foo, Moo]
 * const obj: { foo: typeof Foo, moo: typeof Moo } = { foo: Foo, moo: Moo }
 *
 * // $ExpectType [Foo, Moo]
 * type TestArr = InstanceTypes<typeof arr>
 *
 * // $ExpectType {foo: Foo, moo: Moo}
 * type TestObj = InstanceTypes<typeof obj>
 * ```
 */
export type InstanceTypes<T> = {
  [P in keyof T]: T[P] extends Constructor<infer U> ? U : never
}

/**
 * extracts union type from tuple
 *
 * @example
 *
 * ```ts
 * type Tuple = [number, string, boolean]
 * // $ExpectType number | string | boolean
 * type Test = UnionFromTuple<Tuple>
 * ```
 */
export type UnionFromTuple<T> = T extends (infer U)[] ? U : never

/**
 * Extracts arguments tuple type from a function.
 * This is useful with React children as a function(render prop) pattern, when implementing HoC
 *
 * @example
 *
 * ```ts
 * const funcTestOneArgs = (one: number) => { return }
 * // $ExpectType [number]
 * type Test = FunctionArgsTuple<typeof funcTestNoArgs>
 * ```
 *
 * @deprecated
 * Instead use standard library `Parameters` mapped type
 */
export type FunctionArgsTuple<T> = T extends (...args: infer U) => any
  ? U
  : never

/**
 * Represents the union type of all the value types of the enumerable properties in an object Type T
 */
export type Values<T extends object> = T extends { [k: string]: infer V }
  ? V
  : never

/**
 * Get Proper key types union even from distributed union types.
 *
 * `keyof` doesn't work/distribute on union types. This mapped type fixes this issue
 *
 * @example
 *
 * ```ts
 * type SomeUnion = { one: number } | { three: string } | { four: boolean }
 * // $ExpectType 'one' | 'three' | 'four'
 * type Test = Keys<SomeUnion>
 * ```
 */
export type Keys<T> = T extends any ? keyof T : never

/**
 * Get proper known keys from object which contains index type `[key:string]: any`
 *
 * @example
 *
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
 * Get required only known keys from object which contains index type `[key:string]: any`
 *
 * @example
 *
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
 * Get optional only known keys from object which contains index type `[key:string]: any`
 *
 * @example
 *
 * ```ts
 * type MapWithIndexType = { one: number; two?: string; [k: string]: any; }
 * // $ExpectType 'two'
 * type Test = OptionalKnownKeys<MapWithIndexType>
 * ```
 */
export type OptionalKnownKeys<T> = {
  [K in keyof T]: string extends K
    ? never
    : number extends K
    ? never
    : {} extends Pick<T, K>
    ? K
    : never
} extends { [_ in keyof T]: infer U }
  ? U
  : never

/**
 * Create nominally typed primitives
 *
 * Use this mapped typed for creating types for proper nominal type checking.
 * 👉 kudos to https://michalzalecki.com/nominal-typing-in-typescript/#approach-4-intersection-types-and-brands
 *
 * @example
 *
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
 *
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
 *
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
