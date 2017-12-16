import { asEaseOut, asEaseInOut } from './easingUtils'

const cubic = (x) => x*x*x

cubic.in = cubic
cubic.out = asEaseOut(cubic)
cubic.inout = asEaseInOut(cubic)

export {
  cubic,
}
