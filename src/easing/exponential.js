import { asEaseOut, asEaseInOut } from './easingUtils'

const exponential = (x) => x === 0 ? 0 : Math.pow(2, 10 * (x - 1))

exponential.in = exponential
exponential.out = asEaseOut(exponential)
exponential.inout = asEaseInOut(exponential)

export {
  exponential,
}
