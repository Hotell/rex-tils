import { Component, ComponentType } from 'react'

/**
 * Gets Component class or Function props type
 */
export type GetComponentProps<T> = T extends
  | ComponentType<infer P>
  | Component<infer P>
  ? P
  : never

/**
 * Gets Component class props and state type
 * @returns {{props: P, state: S}}
 */
export type GetComponentPropsAndState<T> = T extends Component<infer P, infer S>
  ? { props: P; state: S }
  : never
