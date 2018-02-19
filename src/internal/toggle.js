import { Observable } from 'rxjs'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/take'

const periodTypeErrorMessage =
  'second argument (period) of toggle should be a number'
const periodRangeErrorMessage =
  'second argument (period) of toggle should be a positive number'

const cyclesTypeErrorMessage =
  'third argument (cycles) of toggle should be undefined or a number'
const cyclesRangeErrorMessage =
  'third argument (cycles) of toggle should be a positive number'

const toggle =
  (scheduler) => (period, cycles) => {
    if (typeof period !== 'number') {
      throw new TypeError(periodTypeErrorMessage)
    }

    if (period <= 0) {
      throw new RangeError(periodRangeErrorMessage)
    }

    if (cycles) {
      if (typeof cycles !== 'number') {
        throw new TypeError(cyclesTypeErrorMessage)
      }

      if (cycles <= 0) {
        throw new RangeError(cyclesRangeErrorMessage)
      }
    }

    cycles = cycles || Number.POSITIVE_INFINITY

    return Observable.interval(period, scheduler)
      .map((cycle) => cycle % 2 === 0)
      .take(cycles)
  }

export {
  toggle,
}
