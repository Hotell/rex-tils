# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.13.1"></a>

## [0.13.1](https://www.github.com/Hotell/rex-tils/compare/v0.13.0...v0.13.1) (2018-09-07)

### Bug Fixes

- **react:** retrurn children from ChildrenAsFunction to mirror Children.only ([689b53f](https://www.github.com/Hotell/rex-tils/commit/689b53f))

<a name="0.13.0"></a>

# [0.13.0](https://www.github.com/Hotell/rex-tils/compare/v0.12.0...v0.13.0) (2018-09-06)

### Features

- **react:** add children helpers and Debug component (#19) ([f0b1f5a](https://www.github.com/Hotell/rex-tils/commit/f0b1f5a))

<a name="0.12.0"></a>

# [0.12.0](https://www.github.com/Hotell/rex-tils/compare/v0.11.1...v0.12.0) (2018-09-06)

### Features

- **type-guards:** better isEmpty (#18) ([59a1a1d](https://www.github.com/Hotell/rex-tils/commit/59a1a1d))

<a name="0.11.1"></a>

## [0.11.1](https://www.github.com/Hotell/rex-tils/compare/v0.11.0...v0.11.1) (2018-09-06)

### Bug Fixes

- **type-guards:** properly narrow isFunction guard to potentional function type (#17) ([09fa4c8](https://www.github.com/Hotell/rex-tils/commit/09fa4c8))

<a name="0.11.0"></a>

# [0.11.0](https://www.github.com/Hotell/rex-tils/compare/v0.10.0...v0.11.0) (2018-09-06)

### Features

- **type-guards:** add isEmpty ([7debc76](https://www.github.com/Hotell/rex-tils/commit/7debc76))
- **types:** add Brand mapped type for nominal type checking capabilities ([d4f47ed](https://www.github.com/Hotell/rex-tils/commit/d4f47ed))
- **types:** add new mapped types helpers ([399b2cf](https://www.github.com/Hotell/rex-tils/commit/399b2cf))
- **types:** add PickWithType and PickWithTypeUnion mapped types ([609266f](https://www.github.com/Hotell/rex-tils/commit/609266f))

<a name="0.10.0"></a>

# [0.10.0](https://www.github.com/Hotell/rex-tils/compare/v0.9.0...v0.10.0) (2018-09-04)

### Bug Fixes

- **type-guards:** fix isNumber return type (#15) ([bbb5ce8](https://www.github.com/Hotell/rex-tils/commit/bbb5ce8)), closes [#15](https://www.github.com/Hotell/rex-tils/issues/15)

### Features

- **type-guards:** add isPromise and isDate guards (#14) ([53ac010](https://www.github.com/Hotell/rex-tils/commit/53ac010))

<a name="0.9.0"></a>

# [0.9.0](https://github.com/Hotell/rex-tils/compare/v0.8.0...v0.9.0) (2018-08-27)

### Features

- **utils:** implement basic utils ([#12](https://github.com/Hotell/rex-tils/issues/12)) ([de98a6f](https://github.com/Hotell/rex-tils/commit/de98a6f))

<a name="0.8.0"></a>

# [0.8.0](https://www.github.com/Hotell/rex-tils/compare/v0.7.0...v0.8.0) (2018-08-20)

### Features

- **type-guards:** add core type-guards with types (#10) ([5bd3b22](https://www.github.com/Hotell/rex-tils/commit/5bd3b22))

<a name="0.7.0"></a>

# [0.7.0](https://www.github.com/Hotell/rex-tils/compare/v0.6.0...v0.7.0) (2018-08-20)

### Features

- **react:** implement defaultProps helpers (#9) ([f0bfefc](https://www.github.com/Hotell/rex-tils/commit/f0bfefc))

<a name="0.6.0"></a>

# [0.6.0](https://www.github.com/Hotell/rex-tils/compare/v0.5.0...v0.6.0) (2018-08-20)

### Bug Fixes

- make react utils public ([d7efe5e](https://www.github.com/Hotell/rex-tils/commit/d7efe5e))

### Features

- **react:** add pickWithRest for handling generic ...rest (#8) ([12c17c5](https://www.github.com/Hotell/rex-tils/commit/12c17c5))

<a name="0.5.0"></a>

# [0.5.0](https://www.github.com/Hotell/rex-tils/compare/v0.4.0...v0.5.0) (2018-08-16)

### Features

- **redux:** make ActionsOfType public so consumers can get action type from union ([8a0118e](https://www.github.com/Hotell/rex-tils/commit/8a0118e)), closes [#3](https://www.github.com/Hotell/rex-tils/issues/3)

<a name="0.4.0"></a>

# [0.4.0](https://www.github.com/Hotell/rex-tils/compare/v0.3.0...v0.4.0) (2018-08-15)

### Features

- **react:** add reaxt type helpers ([0d7f347](https://www.github.com/Hotell/rex-tils/commit/0d7f347))
- **types:** add constructor and omit ([8a84e1a](https://www.github.com/Hotell/rex-tils/commit/8a84e1a))

<a name="0.3.0"></a>

# [0.3.0](https://www.github.com/Hotell/rex-tils/compare/v0.2.0...v0.3.0) (2018-08-15)

### Bug Fixes

- **build:** don't bundle rx deps. mark it as optionalDeps (#5) ([ecacc58](https://www.github.com/Hotell/rex-tils/commit/ecacc58))

### Features

- **redux:** make actions readonly on both type and runtime level (#4) ([13f6e7c](https://www.github.com/Hotell/rex-tils/commit/13f6e7c))

<a name="0.2.0"></a>

# [0.2.0](https://www.github.com/Hotell/rex-tils/compare/v0.1.0...v0.2.0) (2018-08-14)

### Bug Fixes

- **redux:** export missing ofType ([37bec2b](https://www.github.com/Hotell/rex-tils/commit/37bec2b))

### Features

- **redux:** implement rx ofType operator ([01ea0d1](https://www.github.com/Hotell/rex-tils/commit/01ea0d1))

<a name="0.1.0"></a>

# 0.1.0 (2018-08-13)

### Features

- **redux:** implement createAction with type helpers ([cbede4f](https://www.github.com/Hotell/rex-tils/commit/cbede4f))
