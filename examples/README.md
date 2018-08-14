# Examples

`rex-tils` is distributed with a few examples in its source code. Most of these examples are also on `CodeSandbox`.

All examples use `parcel-js` as this is the easiest way how to boot any demo app ;).

## Counter

Run the [Counter](./counter) example:

```
git clone https://github.com/hotell/rex-tils.git

cd rex-tils/examples/counter
yarn install
yarn start
```

Or check out the [sandbox](https://codesandbox.io/s/github/Hotell/rex-tils/tree/master/examples/counter).

This is the most basic example of using rex-tils `createAction` for writing type safe action creators and reducers baked by rex-tils `ofType` RxJS operator used for proper type narrowing within `Redux-observable` epics ( side effects handling ).
