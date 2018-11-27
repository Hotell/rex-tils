// tslint:disable:no-magic-numbers

import { Children, Component, FC } from 'react'

import {
  ChildrenArray,
  ElementConfig,
  ElementProps,
  ElementState,
} from '../../react'

describe(`React helper types`, () => {
  describe(`ElementState`, () => {
    type State = { count: number }
    class MyComponentWithState extends Component<{}, State> {}

    it(`should get Component State`, () => {
      // $ExpectType {count: number}
      type CmponentState = ElementState<typeof MyComponentWithState>

      const state: CmponentState = {
        count: 1,
      }

      expect(state).toEqual({
        count: 1,
      })
    })
  })

  describe(`Flow React helpers`, () => {
    type Props = { foo: number }

    const defaultProps = { foo: 42 }

    class MyComponent extends Component<Props> {
      render() {
        return this.props.foo
      }
    }
    const MyComponentFn = (props: Props) => props.foo
    const MyComponentFnViaGeneric: FC<Props> = (_props) => null

    class MyComponentWithDefault extends Component<Props> {
      static defaultProps = defaultProps
      render() {
        return this.props.foo
      }
    }

    const MyComponentFnWithDefault = (props: Props) => props.foo
    MyComponentFnWithDefault.defaultProps = defaultProps

    const MyComponentFnWithDefaultViaGeneric: FC<Props> = (_props) => null
    MyComponentFnWithDefaultViaGeneric.defaultProps = defaultProps

    describe(`ElementProps`, () => {
      it(`should extract props from Component class`, () => {
        type Test = ElementProps<typeof MyComponent>
        const value: Test = { foo: 42 }

        expect(value).toEqual({ foo: 42 })

        // $ExpectError
        // @ts-ignore
        const value2: Test = {}
      })

      it(`should extract props from Function component`, () => {
        type Test = ElementProps<typeof MyComponentFn>
        const value: Test = { foo: 42 }

        expect(value).toEqual({ foo: 42 })

        // $ExpectError
        // @ts-ignore
        const value2: Test = {}
      })

      it(`should extract props from Function component defined via FC<T>`, () => {
        type Test = ElementProps<typeof MyComponentFnViaGeneric>
        const value: Test = { foo: 42 }

        expect(value).toEqual({ foo: 42 })

        // $ExpectError
        // @ts-ignore
        const value2: Test = {}
      })
    })

    describe(`ElementConfig`, () => {
      it(`should extract props from Component class with defaultProps in mind`, () => {
        type Test = ElementConfig<typeof MyComponentWithDefault>
        const value: Test = { foo: 42 }

        expect(value).toEqual({ foo: 42 })

        const value2: Test = {}
        expect(value2).toEqual({})
      })

      it(`should extract props from Function component with defaultProps in mind`, () => {
        type Test = ElementConfig<typeof MyComponentFnWithDefault>
        const value: Test = { foo: 42 }

        expect(value).toEqual({ foo: 42 })

        const value2: Test = {}
        expect(value2).toEqual({})
      })

      it(`should extract props from Function component defined via FC<T> with defaultProps in mind`, () => {
        type Test = ElementConfig<typeof MyComponentFnWithDefaultViaGeneric>
        const value: Test = { foo: 42 }

        expect(value).toEqual({ foo: 42 })

        const value2: Test = {}
        expect(value2).toEqual({})
      })
    })

    describe(`ChildrenArray`, () => {
      it(`should properly work for children annotation`, () => {
        // A children array can be a single value...
        const children: ChildrenArray<number> = 42

        expect(children).toEqual(42)

        // ...or an arbitrarily nested array.
        const childrenDeep: ChildrenArray<number> = [[1, 2], 3, [4, 5]]

        expect(childrenDeep).toEqual([[1, 2], 3, [4, 5]])

        // Using the `React.Children` API can flatten the array.
        // @FIXME react.d.ts returns React.ReactChild[], so we have to cast the value
        const array: number[] = Children.toArray(childrenDeep) as number[]

        expect(array).toEqual([1, 2, 3, 4, 5])
      })
    })
  })
})
