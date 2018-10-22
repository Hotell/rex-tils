import { Diff } from '../types'

/**
 * @private
 */
type GetDefaultProps<
  P extends object,
  DP extends Partial<P> = Partial<P>
> = DP & Diff<P, DP>

/**
 * identity function helper to properly resolve default and required props type annotation within Component
 * @param _defaultProps defaultProps object
 * @example
 * ```tsx
 * type Props = {
 *  onClick: (e: MouseEvent<HTMLElement>) => void
 *  children: ReactNode
 * } & DefaultProps<typeof defaultProps>
 *
 * const defaultProps = DefaultProps({
 *  color: 'blue' as 'blue' | 'green' | 'red',
 *  type: 'button' as 'button' | 'submit',
 * })
 * const getProps = createPropsGetter(defaultProps)
 *
 * class Button extends Component<Props> {
 *  static readonly defaultProps = defaultProps
 *  render() {
 *    const {
 *      // $ExpectType (e: MouseEvent<HTMLElement>) => void
 *      onClick: handleClick,
 *      // $ExpectType 'blue' | 'green' | 'red'
 *      color,
 *      // $ExpectType 'button' | 'submit'
 *      type,
 *      // $ExpectType ReactNode
 *      children,
 *    } = getProps(this.props)
 *
 *    return (
 *      <button onClick={handleClick} type={type} className={color}>
 *        {children}
 *      </button>
 *    )
 *  }
 * }
 * ```
 */
export const createPropsGetter = <DP extends Readonly<object>>(
  _defaultProps: DP
) => <P extends Partial<DP>>(props: P): GetDefaultProps<P, DP> => props as any

/**
 * helper to create Readonly default props
 * @param props default props object that's gonna be frozen
 * @example
 * ```tsx
 * // $ExpectType Readonly<{color:'blue' | 'green' | 'red', type: 'button' | 'submit'}>
 * const defaultProps = DefaultProps({
 *  color: 'blue' as 'blue' | 'green' | 'red',
 *  type: 'button' as 'button' | 'submit',
 * })
 * ```
 */
export const DefaultProps = <T extends object>(props: T) => Object.freeze(props)

/**
 * type alias to define defaultProps within Props intersection
 * @param props default props object type annotation
 * @example
 * ```ts
 * // $ExpectType {onClick: (e: MouseEvent<HTMLElement>) => void, children: ReactNode, color?:'blue' | 'green' | 'red', type?: 'button' | 'submit'}
 * type Props = {
 *  onClick: (e: MouseEvent<HTMLElement>) => void
 *  children: ReactNode
 * } & DefaultProps<typeof defaultProps>
 * ```
 */
export type DefaultProps<T extends Readonly<object>> = Partial<T>
