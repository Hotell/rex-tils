import React, { Component, ReactNode } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { ChildrenAsFunction } from '../../react'

const initialState = {
  hasError: false,
  error: null as Error | null,
}
class Test extends Component<
  {
    children: (props: { who: string }) => ReactNode
  },
  typeof initialState
> {
  readonly state = initialState

  componentDidCatch(error: Error, info: any) {
    // Display fallback UI
    this.setState({ hasError: true, error })
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
  }
  render() {
    const { children } = this.props
    const { hasError, error } = this.state

    if (hasError) {
      return error!.message
    }

    return ChildrenAsFunction(children) && children({ who: 'World' })
  }
}

describe(`hasChildrenAsFunction`, () => {
  it(`should throw when children is not a function`, () => {
    const root = document.createElement('div')

    class App extends Component {
      render() {
        return (
          // @ts-ignore
          <Test>
            <div>Hello world</div>
          </Test>
        )
      }
    }

    expect(() => render(<App />, root)).toThrowError(
      'React: ChildrenAsFunctionOnly expected to receive a single function as a child.'
    )

    unmountComponentAtNode(root)
  })

  it(`should render children as a function`, () => {
    const root = document.createElement('div')

    render(<Test>{(props) => <div>Hello {props.who}</div>}</Test>, root)

    expect(root.innerHTML).toBe('<div>Hello World</div>')

    unmountComponentAtNode(root)
  })
})
