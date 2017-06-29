# immview-react-connect

Functions to connect [immview](https://github.com/arturkulig/immview) an `Atom` or `Observable` to a React component.

`connect` is best for connecting many instances of the component to a single source
`component` is best for more complex scenarios like connecting to multiple source or where a component instance is meant to make more calculations.

## Installation

```
npm i immview-react-connect --save
```

## `component` usage

```javascript
import { Atom, Combine } from 'immview'
import { component } from 'immview-react-connect'
import * as React from 'react'

const Chest = component(
    (props$, state$) => (
        state$.next({ 'open': 'trea' }),
        state$.next({ 'sesame' : 'sure' }),
        new Combine({
            props: props$,
            state: state$,
        }).map(
            ({props, vault}) => (
                <div>{
                    props.key.split('').map(key => state[key]).join('')
                }</div>
            )
        )
    )
)

const SecretDiscovererWithKey = () => (
    <Chest key="open sesame" />
)
```

## `connect` usage

```javascript
import { Atom } from 'immview'
import { connect } from 'immview-react-connect'
import * as React from 'react'

const Vault$ = new Atom({ 'open sesame': 'treasure' })

const SecretChest = connect(
    ({ children }) => (
        <div>{children}</div>
    ),
    Vault$,
    (Vault, props) => ({
        children: Vault[props.secretKey]
    })
)

const SecretDiscovererWithKey = () => (
    <SecretChest secretKey="open sesame" />
)
```
