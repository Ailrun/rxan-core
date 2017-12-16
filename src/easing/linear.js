import { asEaseOut, asEaseInOut } from './easingUtils'

const linear = (x) => x

linear.in = linear
linear.out = asEaseOut(linear)
linear.inout = asEaseInOut(linear)

export {
  linear,
}
