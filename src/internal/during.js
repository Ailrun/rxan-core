import { concat } from 'rxjs/observable/concat'
import { map } from 'rxjs/operators/map'
import { takeWhile } from 'rxjs/operators/takeWhile'

import { msElapsed } from './msElapsed'

const durationTypeErrorMessage =
  'second argument (duration) of during should be a number'
const durationRangeErrorMessage =
  'second argument (duration) of during should be a positive number'

const during =
  (scheduler) => (duration) => {
    if (typeof duration !== 'number') {
      throw new TypeError(durationTypeErrorMessage)
    }

    if (duration <= 0) {
      throw new RangeError(durationRangeErrorMessage)
    }

    return msElapsed(scheduler)
      .pipe(
        map((ms) => ms / duration),
        takeWhile((percent) => percent < 1),
        (res$) => concat(res$, [1]),
      )
  }

export {
  during,
}
