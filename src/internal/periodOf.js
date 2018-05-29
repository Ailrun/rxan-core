import { interval } from 'rxjs'
import { map, take } from 'rxjs/operators'

const periodTypeErrorMessage =
  'second argument (period) of periodOf should be a number'
const periodRangeErrorMessage =
  'second argument (period) of periodOf should be a positive number'

const cyclesTypeErrorMessage =
  'third argument (cycles) of periodOf should be undefined or a number'
const cyclesRangeErrorMessage =
  'third argument (cycles) of periodOf should be a positive number'

const periodOf =
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

    return interval(period, scheduler).pipe(
      map((cycle) => cycle + 1),
      take(cycles),
    )
  }

export {
  periodOf,
}
