import { linear as linear_ } from './linear'
import { quadratic as quadratic_ } from './quadratic'
import { cubic as cubic_ } from './cubic'
import { sine as sine_ } from './sine'
import { exponential as exponential_ } from './exponential'
import { elastic as elastic_ } from './elastic'
import { withDomainChecker } from './easingUtils'

const linear = withDomainChecker(linear_)
const quadratic = withDomainChecker(quadratic_)
const cubic = withDomainChecker(cubic_)
const sine = withDomainChecker(sine_)
const exponential = withDomainChecker(exponential_)
const elastic = withDomainChecker(elastic_)

export {
  linear,
  quadratic,
  cubic,
  sine,
  exponential,
  elastic,
}
