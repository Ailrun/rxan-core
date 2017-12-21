import { asEaseInOut, asEaseOut } from './easingUtils'

const back = (t) => t * t * (Math.E * t - Math.E + 1)

back.in = back
back.out = asEaseOut(back)
back.inout = asEaseInOut(back)

export {
  back,
}
