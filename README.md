# rxan-core

Core package for rxan

## Requirement

This package requires RxJS@^5 as peer dependency.
You should install rxjs in your project to use this package.

## How to install

```
npm install rxan-core
```

## How to use

with jQuery

```javascript
const $ = require('jQuery')
const rxanC = require('rxan-core')
require('rxjs/add/operators/map')

const target = $('#target')

// Make animation for 500 ms. It generates value from 0 to 1.
rxanC.during()(500)
  .map(function (percent) {
    return percent * 100                // mapping 0~1 to 0~100
  })
  .subscribe(function (marginTop) {
    target.css('marginTop', marginTop)  // assign 0~100 to marginTop of target
  })
```

with React

```javascript
import React, { Component } from 'react'
import { during, easing } from 'rxan-core'

class Example extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // Initial value for marginTop
      marginTop: 0
    }

    this.subscription = during()(500)
      .map((percent) => percent * 100) // mapping 0~1 to 0~100
      .subscribe((marginTop) => {
        this.setState({
          marginTop: marginTop         // assign 0~100 to state.marginTop
        })
      })
  }

  render() {
    return (
      <div style={{ marginTop: this.state.marginTop }}>
        Example!
      </div>
    )
  }
}
```

## Author

- Junyoung Clare Jang: @ailrun
