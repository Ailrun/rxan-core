import { asEaseInOut, asEaseOut } from './easingUtils'

/**
 * Original code for bounde
 */
/*
const { pow } = Math

const bounce = (t) => {
  // gravity per speed
  const g = 2.75
  const halfG = g / 2
  const gSquare = g * g
  // elasticity
  const el = 1 / 4

  const boundaries = []
  boundaries.push(pow(el, 3 / 2))
  boundaries.push(boundaries[0] + pow(el, 1))
  boundaries.push(boundaries[1] + pow(el, 1 / 2))
  boundaries.push(boundaries[2] + 1)

  if (t < boundaries[0] / halfG) {
    return - pow(g * t - boundaries[0], 2) + pow(el, 3)
  } else if (t < boundaries[1] / halfG) {
    return - pow(g * t - boundaries[1] - boundaries[0], 2) + pow(el, 2)
  } else if (t < boundaries[2] / halfG) {
    return - pow(g * t - boundaries[2] - boundaries[1], 2) + pow(el, 1)
  } else {
    return - pow(g * t - boundaries[3] - boundaries[2], 2) + 1
  }
}
*/

const bounce = (t) => {
  const g = 2.75
  if (t < 0.25 / g) {
    const x = g*t - 0.125
    return - x*x + 0.015625
  } else if (t < 0.75 / g) {
    const x = g*t - 0.5
    return - x*x + 0.0625
  } else if (t < 1.75 / g) {
    const x = g*t - 1.25
    return - x*x + 0.25
  } else {
    const x = g*t - 2.75
    return - x*x + 1
  }
}

/**
 * @desc
 * Wolfram alpha code for bounce
 * @code
 * Piecewise[{{-(2.75*t - 0.125)^2 +0.015625, 2.75 * t < 0.25},{-(2.75*t - 0.5)^2 + 0.0625, 2.75 * t < 0.75}, {-(2.75*t - 1.25)^2+0.25, 2.75*t < 1.75}, {-(2.75*t-2.75)^2+1, 2.75*t >= 1.75}}]
 */

/**
 * @desc same with bounce
 */
bounce.in = bounce
bounce.out = asEaseOut(bounce)
bounce.inout = asEaseInOut(bounce)

export {
  bounce,
}
