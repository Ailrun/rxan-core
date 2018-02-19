import { withScheduler } from './schedulerUtils'
import { toggle as toggle_ } from './internal/toggle'

const toggle = withScheduler(toggle_)

export {
  toggle,
}
