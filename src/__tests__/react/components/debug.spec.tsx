import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { Pre } from '../../../react'

describe(`Pre`, () => {
  it(`should render object map`, () => {
    class App extends Component<{
      debugValue: object | string | number | boolean
    }> {
      render() {
        return <Pre>{this.props.debugValue}</Pre>
      }
    }

    const mountTo = document.createElement('div')

    render(<App debugValue={{ example: 123 }} />, mountTo)

    expect(getRenderContent(mountTo)).toBe(`{"example":123}`)

    render(<App debugValue={['one', 'two']} />, mountTo)

    expect(getRenderContent(mountTo)).toBe('["one","two"]')

    // tslint:disable-next-line:no-magic-numbers
    render(<App debugValue={123} />, mountTo)

    expect(getRenderContent(mountTo)).toBe(`123`)

    render(<App debugValue={'hello world'} />, mountTo)

    expect(getRenderContent(mountTo)).toBe(`"helloworld"`)

    render(<App debugValue={false} />, mountTo)

    expect(getRenderContent(mountTo)).toBe(`false`)

    unmountComponentAtNode(mountTo)
  })
})

function getRenderContent(element: HTMLElement) {
  return element.textContent!.replace(/\n|\s/g, '')
}
