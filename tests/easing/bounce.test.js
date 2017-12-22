import { bounce } from '../../src/easing/bounce'

describe('bounce', () => {
  it('should return bouncy ease-in output with its input', () => {
    const inputExpectedPairs = [
      [0, 0],
      [0.1, 0.01188],
      [0.2, 0.06],
      [0.4, 0.2275],
      [0.6, 0.09],
      [0.8, 0.6975],
      [0.9, 0.92438],
      [1, 1],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(bounce(input)).to.be.closeTo(expected, 0.0001, `bounce(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same output with bounce itself', () => {
      const inputs = [0, 0.1, 0.14, 0.24252, 0.5832, 0.62234, 0.841, 0.9235, 1]

      inputs.forEach((input) => {
        expect(bounce.in(input)).to.be.closeTo(bounce(input), 0.0001, `bounce.in(${input}) is far from bounce(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should return bouncy ease-out output with its input', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.07563],
        [0.2, 0.3025],
        [0.4, 0.91],
        [0.6, 0.7725],
        [0.8, 0.94],
        [0.9, 0.98813],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(bounce.out(input)).to.be.closeTo(expected, 0.0001, `bounce.out(${input}) is far from ${expected}`)
      })
    })
  })

  describe('inout', () => {
    it('should return bouncy ease-in output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.03],
        [0.2, 0.11375],
        [0.3, 0.045],
        [0.4, 0.34875],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(bounce.inout(input)).to.be.closeTo(expected, 0.0001, `bounce.inout(${input}) is far from ${expected}`)
      })
    })

    it('should return a value around 0.5 with the input of 0.5', () => {
      expect(bounce.inout(0.5)).to.be.closeTo(0.5, 0.0001, `bounce.inout(0.5) is far from 0.5`)
    })

    it('should return bouncy ease-out output with its input larger than 0.5', () => {
      const inputExpectedPairs = [
        [0.7, 0.955],
        [0.8, 0.88625],
        [0.9, 0.97],
        [0.95, 0.99406],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(bounce.inout(input)).to.be.closeTo(expected, 0.0001, `bounce.inout(${input}) is far from ${expected}`)
      })
    })
  })
})
