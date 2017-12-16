import { withScheduler } from './schedulerUtils'
import { msElapsed as msElapsed_ } from './internal/msElapsed'

const msElapsed = withScheduler(msElapsed_)

export {
  msElapsed,
}
