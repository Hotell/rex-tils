import { createElement } from 'react'

export type Props = {
  children: { [key: string]: any } | string | number | boolean
}

/**
 * for debugging data within your render
 */
export const Pre = (props: Props): JSX.Element => {
  // tslint:disable-next-line:no-magic-numbers
  return createElement('pre', {}, JSON.stringify(props.children, null, 2))
}
