import {
  Component,
  ComponentClass,
  ComponentType,
  createElement,
  Fragment,
} from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { pickWithRest } from '../../react'
import { Omit } from '../../types'

describe(`generic typesafe rest`, () => {
  it(`should return rest and picked props with proper types when HoC is defined`, () => {
    type InjectedProps = { enableLog: boolean }
    type Config = { type: 'log' | 'warn' | 'error' }

    const withLog = (config: Config) => <
      OriginalProps extends Partial<InjectedProps>
    >(
      WrappedComponent: ComponentType<OriginalProps>
    ) => {
      type Props = OriginalProps & InjectedProps
      type HoCProps = Omit<Props, keyof InjectedProps> & Partial<InjectedProps>

      return (class WithLog extends Component<Props> {
        render() {
          const { enableLog = true, rest } = pickWithRest<Props, InjectedProps>(
            this.props,
            ['enableLog']
          )

          try {
            expect(() => {
              // tslint:disable-next-line:no-shadowed-variable
              const { enableLog, rest } = pickWithRest<Props, InjectedProps>(
                this.props,
                // @ts-ignore
                ['enableLogzzz']
              )
              console.log(enableLog, rest)
            }).toThrow()
            // tslint:disable-next-line:no-empty
          } catch {}

          console[config.type]('render called')

          return createElement(WrappedComponent, {
            enableLog,
            ...(rest as object),
          } as Props)
        }
      } as any) as ComponentClass<HoCProps>
    }

    class TestComponent extends Component<{} & InjectedProps> {
      render() {
        return this.props.enableLog ? 'log enabled' : 'log disabled'
      }
    }

    const EnhancedTestComponent = withLog({ type: 'log' })(TestComponent)

    const App = () =>
      createElement(Fragment, {}, [
        createElement(TestComponent, { key: '1', enableLog: false }),
        createElement('hr', { key: '2' }),
        createElement(EnhancedTestComponent, { key: '3' }),
      ])

    const mountTo = document.createElement('div')
    render(createElement(App), mountTo)

    expect(mountTo.textContent).toContain('log enabled')
    expect(mountTo.textContent).toContain('log disabled')

    unmountComponentAtNode(mountTo)
  })
})
