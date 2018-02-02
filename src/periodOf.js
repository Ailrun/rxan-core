import { withScheduler } from './schedulerUtils'
import { periodOf as periodOf_ } from './internal/periodOf'

const periodOf = withScheduler(periodOf_)

export {
  periodOf,
}
