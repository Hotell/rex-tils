jest.mock('../../environment', () => ({ IS_DEV: true, IS_PROD: false }))

import { ActionsUnion, createAction } from '../../redux'

// tslint:disable:no-magic-numbers

describe(`Redux type-safe action helpers`, () => {
  describe(`Should create immutable objects`, () => {
    const SET_AGE = '[core] set age'
    const setAge = (age: number) => createAction(SET_AGE, age)
    const setAgeAction = setAge(33)

    // @ts-ignore
    expect(() => (setAgeAction.type = 'Foo')).toThrow()
    // @ts-ignore
    expect(() => (setAgeAction.payload = 44)).toThrow()
  })
  describe(`Should work with constants`, () => {
    const SET_AGE = '[core] set age'
    const SET_NAME = '[core] set name'
    const RELOAD_URL = '[router] Reload Page'

    const Actions = {
      setAge: (age: number) => createAction(SET_AGE, age),
      setName: (name: string) => createAction(SET_NAME, name),
      reloadUrl: () => createAction(RELOAD_URL),
    }

    type Actions = ActionsUnion<typeof Actions>

    it(`should create proper Redux FSA`, () => {
      const ageAction: Actions = {
        type: SET_AGE,
        payload: 32,
      }
      expect(Actions.setAge(32)).toEqual(ageAction)

      const nameAction: Actions = {
        type: SET_NAME,
        payload: 'Martin',
      }
      expect(Actions.setName('Martin')).toEqual(nameAction)

      const reloadUrlAction: Actions = { type: RELOAD_URL }
      expect(Actions.reloadUrl()).toEqual(reloadUrlAction)
    })
  })

  describe(`Should work with string enums`, () => {
    enum ActionTypes {
      SET_AGE = '[core] set age',
      SET_NAME = '[core] set name',
      RELOAD_URL = '[router] Reload Page',
    }

    const Actions = {
      setAge: (age: number) => createAction(ActionTypes.SET_AGE, age),
      setName: (name: string) => createAction(ActionTypes.SET_NAME, name),
      reloadUrl: () => createAction(ActionTypes.RELOAD_URL),
    }

    type Actions = ActionsUnion<typeof Actions>

    it(`should create proper Redux FSA`, () => {
      const ageAction: Actions = {
        type: ActionTypes.SET_AGE,
        payload: 32,
      }
      expect(Actions.setAge(32)).toEqual(ageAction)

      const nameAction: Actions = {
        type: ActionTypes.SET_NAME,
        payload: 'Martin',
      }
      expect(Actions.setName('Martin')).toEqual(nameAction)

      const reloadUrlAction: Actions = { type: ActionTypes.RELOAD_URL }
      expect(Actions.reloadUrl()).toEqual(reloadUrlAction)
    })
  })

  describe(`should work with reducer`, () => {
    const SET_AGE = '[core] set age'
    const SET_NAME = '[core] set name'
    const RELOAD_URL = '[router] Reload Page'

    const Actions = {
      setAge: (age: number) => createAction(SET_AGE, age),
      setName: (name: string) => createAction(SET_NAME, name),
      reloadUrl: () => createAction(RELOAD_URL),
    }
    type Actions = ActionsUnion<typeof Actions>

    // mirror ES2015 import * as fromActions from '..'
    const fromActions = {
      SET_AGE,
      SET_NAME,
      RELOAD_URL,
    } as {
      SET_AGE: typeof SET_AGE
      SET_NAME: typeof SET_NAME
      RELOAD_URL: typeof RELOAD_URL
    }

    type User = { age: number; name: string }
    // tslint:disable-next-line:no-use-before-declare
    type State = typeof initialState

    const initialState = {
      user: null as Partial<User> | null,
      reloadPage: false,
    }

    const reducer = (state = initialState, action: Actions): State => {
      switch (action.type) {
        case fromActions.SET_AGE: {
          const { payload: newAge } = action
          const newUser = { ...state.user, age: newAge }
          const newState = { ...state, user: newUser }

          return newState
        }

        case fromActions.SET_NAME: {
          const { payload: newName } = action
          const newUser = { ...state.user, name: newName }
          const newState = { ...state, user: newUser }

          return newState
        }

        case fromActions.RELOAD_URL: {
          return {
            ...state,
            reloadPage: true,
          }
        }

        default:
          return state
      }
    }

    let appState = reducer(initialState, { type: 'INITIAL_ACTION' as any })

    expect(appState).toEqual(initialState)

    appState = reducer(appState, Actions.setAge(32))

    expect(appState).toEqual({
      user: { age: 32 },
      reloadPage: false,
    })

    appState = reducer(appState, Actions.setName('Martin'))

    expect(appState).toEqual({
      user: { age: 32, name: 'Martin' },
      reloadPage: false,
    })

    appState = reducer(appState, Actions.reloadUrl())

    expect(appState).toEqual({
      user: { age: 32, name: 'Martin' },
      reloadPage: true,
    })
  })
})
