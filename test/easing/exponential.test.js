import { exponential } from '../../src/easing/exponential'

describe('exponential', () => {
  it('should return exponentially ease-in output with its input', () => {
    const inputExpectedPairs = [
      [0, 0],
      [0.2, 0.00391],
      [0.53, 0.03847],
      [0.78, 0.21764],
      [1, 1],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(exponential(input)).to.be.closeTo(expected, 0.0001, `exponential(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same output with exponential itself', () => {
      const inputs = [0.12, 0.43, 0.61, 0.91]

      inputs.forEach((input) => {
        expect(exponential.in(input)).to.be.closeTo(exponential(input), 0.0001, `exponential.in(${input}) is far from exponential(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should return exponentially ease-out output with its input', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.5],
        [0.3, 0.875],
        [0.6, 0.98438],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(exponential.out(input)).to.be.closeTo(expected, 0.0001, `exponential.out(${input}) is far from ${expected}`)
      })
    })
  })

  describe('inout', () => {
    it('should return exponentially ease-in output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.00195],
        [0.34, 0.05441],
        [0.45, 0.25],
        [0.49, 0.43528],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(exponential.inout(input)).to.be.closeTo(expected, 0.0001, `exponential.inout(${input}) is far from ${expected}`)
      })
    })

    it('should return a value around 0.5 with the input of 0.5', () => {
      expect(exponential.inout(0.5)).to.be.closeTo(0.5, 0.0001, `exponential.inout(0.5) is far from 0.5`)
    })

    it('should return exponentially ease-out output with its input larger than 0.5', () => {
      const inputExpectedPairs = [
        [0.53, 0.67012],
        [0.59, 0.85641],
        [0.63, 0.91753],
        [0.75, 0.98438],
        [0.89, 0.99776],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(exponential.inout(input)).to.be.closeTo(expected, 0.0001, `exponential.inout(${input}) is far from ${expected}`)
      })
    })
  })
})
