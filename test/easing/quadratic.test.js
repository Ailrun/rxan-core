import { quadratic } from '../../src/easing/quadratic'

describe('quadratic', () => {
  it('should return quadratically ease-in output with its input', () => {
    const inputExpectedPairs = [
      [0.1, 0.01],
      [0.2, 0.04],
      [0.3, 0.09],
      [0.4, 0.16],
      [0.5, 0.25],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(quadratic(input)).to.be.closeTo(expected, 0.0001, `quadratic(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same output with quadratic itself', () => {
      const inputs = [0.44, 0.55, 0.66, 0.77, 0.88]

      inputs.forEach((input) => {
        expect(quadratic.in(input)).to.be.closeTo(quadratic(input), 0.0001, `quadratic.in(${input}) is far from quadratic(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should return quadratically ease-out output with its input', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.19],
        [0.2, 0.36],
        [0.3, 0.51],
        [0.4, 0.64],
        [0.5, 0.75],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(quadratic.out(input)).to.be.closeTo(expected, 0.0001, `quadratic.out(${input}) is far from ${expected}`)
      })
    })
  })

  describe('inout', () => {
    it('should return quadratically ease-in output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.02],
        [0.2, 0.08],
        [0.3, 0.18],
        [0.4, 0.32],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(quadratic.inout(input)).to.be.closeTo(expected, 0.0001, `quadratic.inout(${input}) is far from ${expected}`)
      })
    })

    it('should return a value around 0.5 with the input of 0.5', () => {
      expect(quadratic.inout(0.5)).to.be.closeTo(0.5, 0.0001, `quadratic.inout(0.5) is far from 0.5`)
    })

    it('should return quadratically ease-out output with its input larger than 0.5', () => {
      const inputExpectedPairs = [
        [0.64, 0.7408],
        [0.84, 0.9488],
        [0.93, 0.9902],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(quadratic.inout(input)).to.be.closeTo(expected, 0.0001, `quadratic.inout(${input}) is far from ${expected}`)
      })
    })
  })
})
