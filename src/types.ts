export type AnyFunction = (...args: any[]) => any
export type StringMap<T> = { [key: string]: T }
export type Constructor<T = {}> = new (...args: any[]) => T
export type Omit<T, K> = Pick<T, Exclude<keyof T, keyof K>>
