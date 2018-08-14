import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD'

export const Actions = {
  increment: () => createAction(INCREMENT),
  decrement: () => createAction(DECREMENT),
  incrementIfOdd: () => createAction(INCREMENT_IF_ODD),
}

export type Actions = ActionsUnion<typeof Actions>
