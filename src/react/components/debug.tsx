import { createElement, ReactElement } from 'react'

type Props = {
  children: { [key: string]: any } | string | number | boolean
}

/**
 * For debugging data within your component View
 *
 * @example
 *
 * ```tsx
 * const App = (props: {data:object}) => <div><Pre>{props.data}</Pre></div>
 * ```
 *
 */
export const Pre = (props: Props): ReactElement<any> => {
  // tslint:disable-next-line:no-magic-numbers
  return createElement('pre', {}, JSON.stringify(props.children, null, 2))
}
