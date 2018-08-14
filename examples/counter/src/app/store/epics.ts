// tslint:disable:no-magic-numbers

import { ofType } from '@martin_hotell/rex-tils'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { filter, map, withLatestFrom } from 'rxjs/operators'

import * as fromActions from './actions'
import { AppState } from './store'

export const incrementIfOddEpic = (
  action$: ActionsObservable<fromActions.Actions>,
  state$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(fromActions.INCREMENT_IF_ODD),
    withLatestFrom(state$),
    filter(
      (
        [action, state] // $ExpectType ['INCREMENT_IF_ODD', {counter:number}]
      ) => state.counter % 2 === 1
    ),
    map(() => fromActions.Actions.increment())
  )
