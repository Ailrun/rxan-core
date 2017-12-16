# rxan-core

Core package for rxan

## Requirement

This package requires RxJS@^5 as peer dependency. You should install rxjs in your project to use this package.

## How to install

```
npm install rxan-core
```

## How to use

with jQuery

```
const $ = require('jQuery')
const rxanC = require('rxan-core')
require('rxjs/add/operators/map')

const target = $('#target')

// Make animation for 500 ms. It generates value from 0 to 1.
rxanC.during()(500)
  .map((percent) => percent * 100) // mapping 0~1 to 0~100
  .subscribe((marginTop) => {
    // assign 0~100 to marginTop of target
    target.css('marginTop', marginTop)
  })
```

## Author

- Junyoung Clare Jang: @ailrun
