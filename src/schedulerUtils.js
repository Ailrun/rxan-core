import { Scheduler, animationFrameScheduler } from 'rxjs'

const defaultScheduler = animationFrameScheduler

const withDefaultScheduler =
  (f) => (scheduler = defaultScheduler) => f(scheduler)

const buildSchedulerTypeError = (name) => {
  const errorMessage =
    `scheduler parameter for ${name} is not an instance of Scheduler`

  return new TypeError(errorMessage)
}
const withSchedulerChecker =
  (f) => (scheduler) => {
    if (!(scheduler instanceof Scheduler)) {
      throw buildSchedulerTypeError(f.name)
    }

    return f(scheduler)
  }

const withScheduler =
  (f) => withDefaultScheduler(withSchedulerChecker(f))

export {
  withDefaultScheduler,
  withSchedulerChecker,
  withScheduler,
}
