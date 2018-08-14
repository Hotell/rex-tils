import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { rootEpic, rootReducer } from './store/store'

export function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const epicMiddleware = createEpicMiddleware()
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  )

  epicMiddleware.run(rootEpic as any)

  return store
}
