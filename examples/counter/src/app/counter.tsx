import { Component, createElement, Fragment } from 'react'

type Props = {
  count: number
  onIncrement: () => void
  onDecrement: () => void
  onIncrementIfOdd: () => void
}

export class Counter extends Component<Props> {
  render() {
    return (
      <Fragment>
        <h3>Count: {this.props.count}</h3>
        <button onClick={this.props.onIncrement}>Increment</button>
        <button onClick={this.props.onIncrementIfOdd}>Increment if Odd</button>
        <button onClick={this.props.onDecrement}>Decrement</button>
      </Fragment>
    )
  }
}
