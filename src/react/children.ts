import { Children, ReactNode } from 'react'

export const isEmptyChildren = (children: ReactNode) =>
  Children.count(children) === 0

/**
 * Checks if children is a function only ( useful for children as  a function pattern )
 * Similarly to Children.only it will throw an error if it's not a function
 */
export const ChildrenAsFunction = (
  children: any
  // tslint:disable-next-line:ban-types
): children is Function => {
  if (typeof children !== 'function') {
    throw new Error(
      'React: ChildrenAsFunctionOnly expected to receive a single function as a child.'
    )
  }

  return children
}
