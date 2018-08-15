import { Component, SFC } from 'react'

import { GetComponentProps, GetComponentPropsAndState } from '../../react'

describe(`React helper types`, () => {
  it(`should extract prop type from Function and Class component`, () => {
    type Props = { who: string }
    type State = { count: number }
    class Test extends Component<Props, State> {}
    const TestFn = (_props: Props) => null
    const TestFnViaGeneric: SFC<Props> = (_props) => null

    // $ExpectType {who: string}
    type PropsFromComponent = GetComponentProps<Test>

    // $ExpectType {who: string}
    type PropsFromFunction = GetComponentProps<typeof TestFn>

    // $ExpectType {who: string}
    type PropsFromFunction2 = GetComponentProps<typeof TestFnViaGeneric>

    const props: PropsFromComponent & PropsFromFunction = {
      who: 'Me',
    } as PropsFromFunction2

    expect(props).toEqual(props)
  })

  it(`should extract props and state type from Class component`, () => {
    type Props = { who: string }
    type State = { count: number }
    class Test extends Component<Props> {}
    class TestWithState extends Component<Props, State> {}

    // $ExpectType {props: {who: string}, state: {}}
    type PropsFromComponent = GetComponentPropsAndState<Test>

    // $ExpectType {props: {who: string}, state: {count: number}}
    type PropsAndStateFromComponent = GetComponentPropsAndState<TestWithState>

    const props: PropsFromComponent = {
      props: { who: 'Me' },
      state: {},
    }

    const propsAndState: PropsAndStateFromComponent = {
      props: { who: 'Me' },
      state: { count: 0 },
    }

    expect(props).toEqual(props)
    expect(propsAndState).toEqual(propsAndState)
  })
})
