import * as fromActions from './actions'

export const initialState = 0 as number
export type State = typeof initialState

export const reducer = (
  state = initialState,
  action: fromActions.Actions
): State => {
  switch (action.type) {
    case fromActions.INCREMENT: {
      // $ExpectType 'INCREMENT'
      const { type } = action

      return state + 1
    }
    case fromActions.DECREMENT: {
      // $ExpectType 'DECREMENT'
      const { type } = action

      return state - 1
    }
    default:
      return state
  }
}
