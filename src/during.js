import { withScheduler } from './schedulerUtils'
import { during as during_ } from './internal/during'

const during = withScheduler(during_)

export {
  during,
}
