import * as fromActions from './actions'

export const initialState = 0 as number
export type State = typeof initialState

export const reducer = (
  state = initialState,
  action: fromActions.Actions
): State => {
  switch (action.type) {
    case fromActions.INCREMENT:
      return state + 1
    case fromActions.DECREMENT:
      return state - 1
    default:
      return state
  }
}
