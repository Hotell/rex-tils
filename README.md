# rex-tils 🦖 ⚛ ️🖖

> Type safe utils for redux actions and various guard utils for React and Angular

> **WHY/WHAT? 👉** https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575

[![Greenkeeper badge](https://badges.greenkeeper.io/Hotell/rex-tils.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/Hotell/rex-tils.svg?branch=master)](https://travis-ci.org/Hotell/rex-tils)
[![NPM version](https://img.shields.io/npm/v/%40martin_hotell%2Frex-tils.svg)](https://www.npmjs.com/package/@martin_hotell/rex-tils)
![Downloads](https://img.shields.io/npm/dm/@martin_hotell/rex-tils.svg)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Installing

```sh
yarn add @martin_hotell/rex-tils
# OR
npm install @martin_hotell/rex-tils
```

> **Note:**
>
> 1.  This library supports only `TS >= 2.8` ( because it uses conditional types #dealWithIt )
> 2.  For leveraging Rx `ofType` operator within your Epics/Effects you need to install `rxjs>= 6.x`

## Getting started

Let's demonstrate simple usage with old good Counter example:

[![Edit counter-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Hotell/rex-tils/tree/master/examples/counter)

1.  Create Type-safe Redux Actions

```tsx
// actions.ts
import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD'

export const Actions = {
  increment: () => createAction(INCREMENT),
  decrement: () => createAction(DECREMENT),
  incrementIfOdd: () => createAction(INCREMENT_IF_ODD),
}

// we leverage TypeScript token merging, so our consumer can use `Actions` for both runtime and compile time types 💪
export type Actions = ActionsUnion<typeof Actions>
```

2.  Use Type-safe Redux Actions within Reducer

```tsx
// reducer.ts
import * as fromActions from './actions'

export const initialState = 0 as number
export type State = typeof initialState

export const reducer = (
  state = initialState,
  action: fromActions.Actions
): State => {
  switch (action.type) {
    case fromActions.INCREMENT: {
      // $ExpectType 'INCREMENT'
      const { type } = action

      return state + 1
    }
    case fromActions.DECREMENT: {
      // $ExpectType 'DECREMENT'
      const { type } = action

      return state - 1
    }
    default:
      return state
  }
}
```

3.  Use Type-safe Redux Actions within Epics with `ofType` Rx operator

```tsx
// epics.ts

import { ofType } from '@martin_hotell/rex-tils'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { filter, map, withLatestFrom } from 'rxjs/operators'

import * as fromActions from './actions'
import { AppState } from './store'

export const incrementIfOddEpic = (
  // provide all our Actions type that can flow through the stream
  // everything else is gonna be handled by TypeScript so we don't have to provide any explicit type annotations. Behold... top notch DX 👌❤️🦖
  action$: ActionsObservable<fromActions.Actions>,
  state$: StateObservable<AppState>
) =>
  action$.pipe(
    ofType(fromActions.INCREMENT_IF_ODD),
    withLatestFrom(state$),
    filter(
      (
        [action, state] // $ExpectType ['INCREMENT_IF_ODD', {counter:number}]
      ) => state.counter % 2 === 1
    ),
    map(() => fromActions.Actions.increment())
  )
```

## Examples

Go checkout [examples](./examples) !

## API

rex-tils API is tiny and consist of 2 categories:

1.  Runtime JavaScript helpers
2.  Compile time TypeScript type helpers

### 1. Runtime javascript helpers

**`createAction<T extends string,P>(type: T,payload?: P): Action<T,P>`**

- use for declaring action creators

**`ofType(...keys:string[]): Observable<Action>`**

- use within Epic/Effect for filtering actions

### 2. Compile time TypeScript type helpers

**`ActionsUnion<A extends StringMap<AnyFunction>> = ReturnType<A[keyof A]>`**

- use for getting action types from action creators implementation

```tsx
type Actions = ActionsUnion<typeof Actions>
```

**`ActionsOfType<ActionUnion, ActionType extends string>`**

- helper for getting particular action type from ActionsUnion

```tsx
const SET_AGE = '[core] set age'
const SET_NAME = '[core] set name'

const Actions = {
  setAge: (age: number) => createAction(SET_AGE, age),
  setName: (name: string) => createAction(SET_NAME, name),
}

type Actions = ActionsUnion<typeof Actions>

type AgeAction = ActionsOfType<Actions, typeof SET_AGE>

const action: AgeAction = {
  type: '[core] set age',
  payload: 23,
}
```

**`AnyFunction = (...args: any[]) => any`**

- use this instead of `Function` type constructor

**`StringMap<T> = { [key: string]: T }`**

- simple alias to save you keystrokes when defining JS typed object maps

```tsx
type Users = StringMap<{ name: string; email: string }>

const users: Users = {
  1: { name: 'Martin', email: 'goo@gl.com' },
  2: { name: 'John', email: 'doe@john.com' },
}
```

**`Constructor<T>`**

- alias for the construct signature that describes a type which can construct objects of the generic type T and whose constructor function accepts an arbitrary number of parameters of any type

**`Omit<T,K>`**

```tsx
type Result = Omit<
  {
    one: string
    two: number
    three: boolean
  },
  {
    two: number
  }
>

const obj: Result = {
  one: '123',
  three: false,
}
```

#### React related types:

**`GetComponentProps<T>`**

- extracts Props type annotation from Component class or component Function

```tsx
type Props = { who: string }
type State = { count: number }
class Test extends Component<Props, State> {}
const TestFn = (_props: Props) => null
const TestFnViaGeneric: SFC<Props> = (_props) => null

// $ExpectType {who: string}
type PropsFromComponent = GetComponentProps<Test>

// $ExpectType {who: string}
type PropsFromFunction = GetComponentProps<typeof TestFn>

// $ExpectType {who: string}
type PropsFromFunction2 = GetComponentProps<typeof TestFnViaGeneric>
```

**`GetComponentPropsAndState<T>`**

- extracts Props and State type annotation from Component class

```tsx
type Props = { who: string }
type State = { count: number }
class Test extends Component<Props> {}
class TestWithState extends Component<Props, State> {}

// $ExpectType {props: {who: string}, state: {}}
type PropsFromComponent = GetComponentPropsAndState<Test>

// $ExpectType {props: {who: string}, state: {count: number}}
type PropsAndStateFromComponent = GetComponentPropsAndState<TestWithState>
```

## Guides

@TODO

---

Execute `yarn release` which will handle following tasks:

- bump package version and git tag
- update/(create if it doesn't exist) CHANGELOG.md
- push to github master branch + push tags
- publish build packages to npm

> releases are handled by awesome [standard-version](https://github.com/conventional-changelog/standard-version)

### Pre-release

- To get from `1.1.2` to `1.1.2-0`:

`yarn release --prerelease`

- **Alpha**: To get from `1.1.2` to `1.1.2-alpha.0`:

`yarn release --prerelease alpha`

- **Beta**: To get from `1.1.2` to `1.1.2-beta.0`:

`yarn release --prerelease beta`

### Dry run mode

See what commands would be run, without committing to git or updating files

`yarn release --dry-run`

### Check what files are gonna be published to npm

- `yarn pack` OR `yarn release:preflight` which will create a tarball with everything that would get published to NPM

## Tests

Test are written and run via Jest 💪

```
yarn test
# OR
yarn test:watch
```

## Style guide

Style guides are enforced by robots, I meant prettier and tslint of course 🤖 , so they'll let you know if you screwed something, but most of the time, they'll autofix things for you. Magic right ?

### Style guide npm scripts

```sh
#Format and fix lint errors
yarn ts:style:fix
```

## Generate documentation

`yarn docs`

## Commit ( via commitizen )

- this is preferred way how to create conventional-changelog valid commits
- if you prefer your custom tool we provide a commit hook linter which will error out, it you provide invalid commit message
- if you are in rush and just wanna skip commit message validation just prefix your message with `WIP: something done` ( if you do this please squash your work when you're done with proper commit message so standard-version can create Changelog and bump version of your library appropriately )

`yarn commit` - will invoke [commitizen CLI](https://github.com/commitizen/cz-cli)

### Troubleshooting

## Licensing

[MIT](./LICENSE.md) as always
