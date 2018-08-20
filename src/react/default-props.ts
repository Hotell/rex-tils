import { Omit } from '../types'

/**
 * @private
 */
type GetDefaultProps<
  P extends object,
  DP extends Partial<P> = Partial<P>
> = DP & Omit<P, DP>

/**
 * identity function helper to properly resolve default and required props type annotation within Component
 * @param _defaultProps
 */
export const createPropsGetter = <DP extends Readonly<object>>(
  _defaultProps: DP
) => <P extends Partial<DP>>(props: P): GetDefaultProps<P, DP> => props as any

/**
 * helper to create Readonly default props
 * @param props
 */
export const DefaultProps = <T extends object>(props: T) => Object.freeze(props)

/**
 * type alias to define defaultProps within Props intersection
 * @param props
 */
export type DefaultProps<T extends Readonly<object>> = Partial<T>
