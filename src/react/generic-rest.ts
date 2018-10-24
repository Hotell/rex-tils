import { __rest } from 'tslib'
import { Diff } from '../types'

/**
 * Use this to get properly typed {...rest} when used with generics. ( React HoC )
 *
 * @param props
 * @param pickProps
 *
 * @example
 *
 * ```tsx
 * type InjectedProps = { enableLog: boolean }
 * type Config = {...}
 *
 * const withLog = (config: Config) => <OriginalProps extends InjectedProps>(WrappedComponent: ComponentType<OriginalProps>) => {
 *
 *   type Props = OriginalProps & InjectedProps
 *
 *   return class WithLog extends Component<Props> {
 *     render(){
 *       const {enableLog, rest} = genRest<Props, InjectedProps>(this.props, ['enableLog'])
 *       return <WrappedComponent log={enableLog} {...rest} />
 *     }
 *   }
 * }
 * ```
 *
 */
export const pickWithRest = <
  Props extends object = object,
  PickedProps extends object = object,
  Rest = { rest: Diff<Props, PickedProps> }
>(
  props = {} as object,
  pickProps = [] as (keyof PickedProps)[]
) => {
  const rest = __rest(props, pickProps as string[])
  const picked = pickProps.reduce(
    // @ts-ignore
    (acc, nextPropName) => ({ ...acc, [nextPropName]: props[nextPropName] }),
    {}
  )

  return { ...picked, rest } as PickedProps & Rest
}
