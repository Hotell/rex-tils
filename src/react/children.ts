import { Children, ReactNode } from 'react'
import { AnyFunction } from '../types'

export const isEmptyChildren = (children: ReactNode) =>
  Children.count(children) === 0

/**
 * Checks if children is a function only ( useful for children as  a function pattern )
 * Similarly to Children.only it will throw an error if it's not a function
 *
 * @example
 *
 * ```ts
 * type Props = {
 *  userId: string
 *  children: (props:{data: UserModel}) => ReactElement
 * }
 *
 * type State = { data: UserModel | null }
 *
 * class UserRenderer extends Component<Props, State> {
 *   render(){
 *     const {data} = this.state
 *     // Will throw on runtime if children is not a function
 *     // $ExpectType (props: {data: UserModel}) => ReactElement
 *     const childrenFn = ChildrenAsFunction(children)
 *
 *     return data ? children(data) : 'Loading...'
 *   }
 *
 *   componentDidMount(){
 *     fetch(`api/users/${this.props.userId}`).json().then(data=>this.setState({data}))
 *   }
 * }
 *
 * const App = () => <UserRenderer userId={7}>
 *  { ({data}) => <div>name: {data.name}}</div> }
 * </UserRenderer>
 * ```
 */
export const ChildrenAsFunction = <T extends AnyFunction>(children: T) => {
  if (typeof children !== 'function') {
    throw new Error(
      'React: ChildrenAsFunctionOnly expected to receive a single function as a child.'
    )
  }

  return children
}
