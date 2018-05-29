import { defer, interval } from 'rxjs'
import { map } from 'rxjs/operators'

const msElapsed =
  (scheduler) =>
    defer(() => {
      const startTime = scheduler.now()

      return interval(0, scheduler).pipe(
        map(() => scheduler.now() - startTime),
      )
    })

export {
  msElapsed,
}
