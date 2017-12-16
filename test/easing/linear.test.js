import { linear } from '../../src/easing/linear'

describe('linear', () => {
  it('should return linearly ease-in value with its input', () => {
    const inputExpectedPairs = [
      [0, 0],
      [0.2, 0.2],
      [0.4, 0.4],
      [0.6, 0.6],
      [0.8, 0.8],
      [1, 1],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(linear(input)).to.be.closeTo(expected, 0.0001, `linear(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same result with linear itself', () => {
      const inputs = [0, 0.2, 0.4, 0.6, 0.8, 1]

      inputs.forEach((input) => {
        expect(linear.in(input)).to.be.closeTo(linear(input), 0.0001, `linear.in(${input}) is far from linear(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should make same result with linear itself', () => {
      const inputs = [0, 0.2, 0.4, 0.6, 0.8, 1]

      inputs.forEach((input) => {
        expect(linear.out(input)).to.be.closeTo(linear(input), 0.0001, `linear.out(${input}) is far from linear(${input})`)
      })
    })
  })

  describe('inout', () => {
    it('should make same result with linear itself', () => {
      const inputs = [0, 0.2, 0.4, 0.6, 0.8, 1]

      inputs.forEach((input) => {
        expect(linear.inout(input)).to.be.closeTo(linear(input), 0.0001, `linear.inout(${input}) is far from linear(${input})`)
      })
    })
  })
})
