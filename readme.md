# immview-react-connect

Function to connect [immview](https://github.com/arturkulig/immview) an `Atom` or `Observable` to a React component.

## Installation

```
npm i immview-react-connect --save
```

## Usage

### TypeScript+JSX
```typescript
import { Observable } from 'immview'
import connect from 'immview-react-connect'
import * as React from 'react'

const Cave = new Observable<{[id: string]: string}>(
    observer => {
        observer.next({ 'open sesame': 'treasure' })
    }
)

const SecretChest = connect(
    ({ children }) => (
        <div>{children}</div>
    ),
    Cave,
    (CaveValue, props: {secretKey: string}) => ({
        children: CaveValue[props.secretKey]
    })
)

const SecretDiscovererWithKey = () => (
    <SecretChest secretKey="open sesame" />
)
```

### ES6+JSX

```javascript
import { Observable } from 'immview'
import connect from 'immview-react-connect'
import * as React from 'react'

const Cave = new Observable(
    observer => {
        observer.next({ 'open sesame': 'treasure' })
    }
)

const SecretChest = connect(
    ({ children }) => (
        <div>{children}</div>
    ),
    Cave,
    (CaveValue, props) => ({
        children: CaveValue[props.secretKey]
    })
)

const SecretDiscovererWithKey = () => (
    <SecretChest secretKey="open sesame" />
)
```

### ES5

```javascript
const { Observable } = require('immview')
const connect = require('immview-react-connect')
const React = require('react')

const Cave = new Observable(
    function (observer) => {
        observer.next({ 'open sesame': 'treasure' })
    }
)

const SecretChest = connect(
    function (props) {
        return React.createElement(
            "div",
            {},
            props.children
        )
    },
    Cave,
    function (CaveValue, props) {
        return {
            children: CaveValue[props.secretKey]
        }
    }
)

const SecretDiscovererWithKey = function () {
    return React.createElement(
        SecretChest
        { secretKey: 'open sesame' }
    )
}
```
