import { ComponentClass, ComponentType, ReactChild } from 'react'

import { Diff } from '../types'

/**
 * @private
 */
type FunctionComponent<P> = ((props: P) => React.ReactNode)

/**
 * @private
 */
type NestedArray<T extends ReactChild> = T | T[]

/**
 * A React children array can be a single value or an array nested to any level.
 * It is designed to be used with the React.Children API.
 *
 * @example
 *
 * ```
 */
export type ChildrenArray<T extends ReactChild> =
  | NestedArray<T>
  | NestedArray<T>[]

/**
 * Gets Component/PureComponent state type
 *
 * @example
 *
 * ```tsx
 * class MyComponent extends React.Component<{},{foo: number}> {
 *  state = {foo: 42};
 *  render() {
 *    return this.props.foo;
 *  }
 * }
 *
 * // $ExpectType {foo: number}
 * type State =  ElementState<typeof MyComponent>
 * ```
 */
export type ElementState<T> = T extends ComponentClass<any, infer S> ? S : never

/**
 * Gets the props for a React element type, without preserving the optionality of defaultProps.
 * Type could be a React class component or a stateless functional component.
 * This type is used for the props property on React.Element<typeof Component>.
 *
 * Like React.Element<typeof Component>, Type must be the type of a React component,
 * so you need to use typeof as in React.ElementProps<typeof MyComponent>.
 *
 * **NOTE:**
 * Because ElementProps does not preserve the optionality of defaultProps, ElementConfig (which does) is more often the right choice, especially for simple props pass-through as with higher-order components.
 *
 * @example
 *
 * ```tsx
 * import React from 'react'
 * class MyComponent extends React.Component<{foo: number}> {
 *  render() {
 *    return this.props.foo;
 *  }
 * }
 *
 * ({foo: 42} as ElementProps<typeof MyComponent>)
 * ```
 */
export type ElementProps<T> = T extends
  | ComponentType<infer P>
  | FunctionComponent<infer P>
  ? P
  : never

/**
 * Like ElementProps<typeof Component> this utility gets the type of a component’s props but preserves the optionality of defaultProps!
 *
 * Like React.Element<typeof Component>, Type must be the type of a React component so you need to use typeof as in React.ElementProps<typeof MyComponent>.
 *
 * @example
 *
 * ```tsx
 * import React from 'react'
 * class MyComponent extends React.Component<{foo: number}> {
 *  static defaultProps = {foo: 42};
 *  render() {
 *    return this.props.foo;
 *  }
 * }
 *
 * // `ElementProps<>` requires `foo` even though it has a `defaultProp`.
 * ({foo: 42} as ElementProps<typeof MyComponent>)
 *
 * // `ElementConfig<>` does not require `foo` since it has a `defaultProp`.
 * ({} as ElementConfig<typeof MyComponent>)
 * ```
 */
export type ElementConfig<T> = T extends
  | {
      defaultProps?: infer D
    } & ComponentType<infer P>
  | FunctionComponent<infer P>
  ? Partial<D> & Diff<P, D>
  : T extends ComponentType<infer Props> | FunctionComponent<infer Props>
    ? Props
    : never
