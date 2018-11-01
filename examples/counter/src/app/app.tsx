// tslint:disable:jsx-no-lambda
import { Component, createElement } from 'react'
import { Unsubscribe } from 'redux'

import { Counter } from './counter'
import { configureStore } from './store.config'
import { Actions } from './store/actions'

const store = configureStore()
const { dispatch } = store

const initialState: ReturnType<typeof store.getState> = { counter: 0 }

export class App extends Component<{}, typeof initialState> {
  readonly state = initialState
  _subscription = null as Unsubscribe | null
  render() {
    return (
      <div className="app">
        <h1>Counter app</h1>

        <Counter
          count={store.getState().counter}
          onIncrement={() => dispatch(Actions.increment())}
          onDecrement={() => dispatch(Actions.decrement())}
          onIncrementIfOdd={() => dispatch(Actions.incrementIfOdd())}
        />
      </div>
    )
  }
  componentDidMount() {
    this._subscription = store.subscribe(() => {
      this.setState({ ...store.getState() })
    })
  }

  componentWillUnmount() {
    this._subscription!()
  }
}
