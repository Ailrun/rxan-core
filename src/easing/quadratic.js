import { asEaseOut, asEaseInOut } from './easingUtils'

const quadratic = (x) => x*x

quadratic.in = quadratic
quadratic.out = asEaseOut(quadratic)
quadratic.inout = asEaseInOut(quadratic)

export {
  quadratic,
}
