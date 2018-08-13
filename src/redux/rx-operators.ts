import { Observable, OperatorFunction } from 'rxjs'
import { filter } from 'rxjs/operators'

import { Action, ActionsOfType } from './types'

export function ofType<V, T1 extends string>(
  t1: T1
): OperatorFunction<V, ActionsOfType<V, T1>>
export function ofType<V, T1 extends string, T2 extends string>(
  t1: T1,
  t2: T2
): OperatorFunction<V, ActionsOfType<V, T1 | T2>>
export function ofType<
  V,
  T1 extends string,
  T2 extends string,
  T3 extends string
>(t1: T1, t2: T2, t3: T3): OperatorFunction<V, ActionsOfType<V, T1 | T2 | T3>>
export function ofType<
  V,
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string
>(
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4
): OperatorFunction<V, ActionsOfType<V, T1 | T2 | T3 | T4>>
export function ofType<
  V,
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  T5 extends string
>(
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5
): OperatorFunction<V, ActionsOfType<V, T1 | T2 | T3 | T4 | T5>>

export function ofType(...keys: string[]) {
  return (source: Observable<Action>) =>
    source.pipe(filter(action => keys.indexOf(action.type) !== -1))
}
