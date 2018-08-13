import { AnyFunction, StringMap } from '../types'

// interface Action<T extends string, P> {
//   type: T
//   payload?: P
// }
// export interface Action<T extends string> {
//   type: T
// }
// export interface ActionWithPayload<T extends string, P> extends Action<T> {
//   payload: P
// }

// We use conditional types so we can have only one type for defining Action
export type Action<T extends string = string, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P }

export type ActionsUnion<A extends StringMap<AnyFunction>> = ReturnType<
  A[keyof A]
>

// conditional type for filtering actions in epics/effects
export type ActionsOfType<
  ActionUnion,
  ActionType extends string
> = ActionUnion extends Action<ActionType> ? ActionUnion : never
