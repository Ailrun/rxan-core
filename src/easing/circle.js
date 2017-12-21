import { asEaseInOut, asEaseOut } from './easingUtils'

const circle = (t) => 1 - Math.sqrt(1 - t*t)

circle.in = circle
circle.out = asEaseOut(circle)
circle.inout = asEaseInOut(circle)

export {
  circle,
}
