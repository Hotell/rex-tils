import { applyMiddleware, combineReducers, createStore } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import * as epics from './epics'
import * as reducers from './reducer'

export interface AppState {
  counter: reducers.State
}

export const rootReducer = combineReducers<AppState>({
  counter: reducers.reducer,
})
export const rootEpic = combineEpics(epics.incrementIfOddEpic)
