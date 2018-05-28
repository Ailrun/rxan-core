import { defer } from 'rxjs/observable/defer'
import { interval } from 'rxjs/observable/interval'
import { map } from 'rxjs/operators/map'

const msElapsed =
  (scheduler) => defer(() => {
    const startTime = scheduler.now()

    return interval(0, scheduler).pipe(
      map(() => scheduler.now() - startTime),
    )
  })

export {
  msElapsed,
}
