import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeWhile'

import { msElapsed } from './msElapsed'

const durationTypeErrorMessage =
  'second argument (duration) of during should be a number'

const during =
  (scheduler) => (duration) => {
    if (typeof duration !== 'number') {
      throw new TypeError(durationTypeErrorMessage)
    }

    return msElapsed(scheduler)
      .map((ms) => ms / duration)
      .takeWhile((percent) => percent < 1)
      .concat([1])
  }

export {
  during,
}
