import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/defer'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/map'

const msElapsed =
  (scheduler) =>
    Observable.defer(() => {
      const startTime = scheduler.now()

      return Observable.interval(0, scheduler)
        .map(() => scheduler.now() - startTime)
    })

export {
  msElapsed,
}
