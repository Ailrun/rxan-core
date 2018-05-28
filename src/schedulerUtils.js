import { async } from 'rxjs/scheduler/async'
import { animationFrame } from 'rxjs/scheduler/animationFrame'

const SchedulerConstructor =
  Object.getPrototypeOf(Object.getPrototypeOf(async)).constructor
const defaultScheduler = animationFrame

const withDefaultScheduler =
  (f) => (scheduler = defaultScheduler) => f(scheduler)

const buildSchedulerTypeError = (name) => {
  const errorMessage =
    `scheduler parameter for ${name} is not an instance of Scheduler`

  return new TypeError(errorMessage)
}
const withSchedulerChecker =
  (f) => (scheduler) => {
    if (!(scheduler instanceof SchedulerConstructor)) {
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
