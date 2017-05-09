# immview-react-connect

Functions to connect [immview](https://github.com/arturkulig/immview) an `Atom` or `Observable` to a React component.

`connect` is best for connecting many instances of the component to a single source
`component` is best for more complex scenarios like connecting to multiple source or where a component instance is meant to make more calculations.

## Installation

```
npm i immview-react-connect --save
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

## `component` usage

```javascript
import { Atom, Combine } from 'immview'
import { component } from 'immview-react-connect'
import * as React from 'react'

const Vault$ = new Atom({ 'open sesame': 'treasure' })

const SecretChest = component(
    props$ =>
        new Combine({
            props: props$,
            vault: Vault$,
        }).map(
            ({props, vault}) => (
                <div>{vault[props.secretKey]}</div>
            )
        )
)

const SecretDiscovererWithKey = () => (
    <SecretChest secretKey="open sesame" />
)
```
