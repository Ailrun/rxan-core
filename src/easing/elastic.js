import { asEaseOut, asEaseInOut } from './easingUtils'

const { PI, pow, sin } = Math

const elastic = (t) => t === 0 ?
  0 :
  pow(2, 10 * (t - 1)) * sin(t * (13 / 2) * PI)

elastic.in = elastic
elastic.out = asEaseOut(elastic)
elastic.inout = asEaseInOut(elastic)

export {
  elastic,
}
