import { cubic } from '../../src/easing/cubic'

describe('cubic', () => {
  it('should return cubically ease-in output with its input', () => {
    const inputExpectedPairs = [
      [0, 0],
      [0.1, 0.001],
      [0.2, 0.008],
      [0.3, 0.027],
      [0.4, 0.064],
      [0.5, 0.125],
      [1, 1],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(cubic(input)).to.be.closeTo(expected, 0.0001, `cubic(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same output with cubic itself', () => {
      const inputs = [0.44, 0.55, 0.66, 0.77, 0.88]

      inputs.forEach((input) => {
        expect(cubic.in(input)).to.be.closeTo(cubic(input), 0.0001, `cubic.in(${input}) is far from cubic(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should return cubically ease-out output with its input', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.5, 0.875],
        [0.6, 0.936],
        [0.7, 0.973],
        [0.8, 0.992],
        [0.9, 0.999],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(cubic.out(input)).to.be.closeTo(expected, 0.0001, `cubic.out(${input}) is far from ${expected}`)
      })
    })
  })

  describe('inout', () => {
    it('should return cubically ease-in output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.004],
        [0.2, 0.032],
        [0.3, 0.108],
        [0.4, 0.256],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(cubic.inout(input)).to.be.closeTo(expected, 0.0001, `cubic.inout(${input}) is far from ${expected}`)
      })
    })

    it('should return a value around 0.5 with the input of 0.5', () => {
      expect(cubic.inout(0.5)).to.be.closeTo(0.5, 0.0001, `cubic.inout(0.5) is far from 0.5`)
    })

    it('should return cubically ease-out output with its input larger than 0.5', () => {
      const inputExpectedPairs = [
        [0.62, 0.780512],
        [0.7, 0.892],
        [0.86, 0.989024],
        [0.9, 0.996],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(cubic.inout(input)).to.be.closeTo(expected, 0.0001, `cubic.inout(${input}) is far from ${expected}`)
      })
    })
  })
})
