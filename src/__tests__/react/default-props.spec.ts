import { Component, createElement, MouseEvent, ReactNode, SFC } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { createPropsGetter, DefaultProps } from '../../react'

// tslint:disable:no-magic-numbers

describe(`default props helper`, () => {
  type Props = {
    onClick: (e: MouseEvent<HTMLElement>) => void
    children: ReactNode
  } & DefaultProps<typeof defaultProps>

  const defaultProps = DefaultProps({
    color: 'blue' as 'blue' | 'green' | 'red',
    type: 'button' as 'button' | 'submit',
  })
  const getProps = createPropsGetter(defaultProps)

  const resolveColorTheme = (color: NonNullable<Props['color']>) => {
    const btnThemes = {
      blue: 'btn-primary',
      green: 'btn-secondary',
      red: 'btn-accent',
    }

    return btnThemes[color] || 'btn-default'
  }

  it(`should properly resolve default props`, () => {
    class Button extends Component<Props> {
      static readonly defaultProps = defaultProps
      render() {
        const {
          // $ExpectType (e: MouseEvent<HTMLElement>) => void
          onClick: handleClick,
          // $ExpectType 'blue' | 'green' | 'red'
          color,
          // $ExpectType 'button' | 'submit'
          type,
          // $ExpectType ReactNode
          children,
        } = getProps(this.props)

        const cssClass = resolveColorTheme(color)

        return createElement(
          'button',
          { type, className: cssClass, onClick: handleClick },
          children
        )
      }
    }

    const ButtonSFC: SFC<Props> = (props) => {
      const {
        // $ExpectType (e: MouseEvent<HTMLElement>) => void
        onClick: handleClick,
        // $ExpectType 'blue' | 'green' | 'red'
        color,
        // $ExpectType 'button' | 'submit'
        type,
        // $ExpectType ReactNode
        children,
      } = getProps(props)

      const cssClass = resolveColorTheme(color)

      return createElement(
        'button',
        { type, className: cssClass, onClick: handleClick },
        children
      )
    }
    ButtonSFC.defaultProps = defaultProps

    const mountTo = document.createElement('div')

    class App extends Component {
      private handleClick = () => {
        console.log('clicked!')
      }
      render() {
        return createElement(
          'div',
          {},
          createElement(Button, {
            onClick: this.handleClick,
            children: 'Click me!',
          }),
          createElement(ButtonSFC, {
            onClick: this.handleClick,
            children: 'Click me!',
          })
        )
      }
    }

    render(createElement(App), mountTo)

    expect(mountTo.querySelectorAll('button')).toHaveLength(2)

    unmountComponentAtNode(mountTo)
  })
})
