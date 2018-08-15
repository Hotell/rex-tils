import { IS_DEV } from '../environment'
import { Action } from './types'

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(
  type: T,
  payload: P
): Action<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
  const action = payload === undefined ? { type } : { type, payload }

  return IS_DEV ? Object.freeze(action) : action
}
