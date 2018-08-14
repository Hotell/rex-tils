// tslint:disable:jsx-no-lambda
import { Component, createElement } from 'react'

import { Counter } from './counter'
import { configureStore } from './store.config'
import { Actions } from './store/actions'

const store = configureStore()
const { dispatch } = store

export class App extends Component<{}, ReturnType<typeof store.getState>> {
  state = { counter: 0 }
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
    store.subscribe(() => {
      this.setState({ ...store.getState() })
    })
  }
}
