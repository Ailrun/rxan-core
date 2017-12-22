import { sine } from '../../src/easing/sine'

describe('sine', () => {
  it('should return sine-like ease-in output with its input', () => {
    const inputExpectedPairs = [
      [0, 0],
      [0.2, 0.04894],
      [0.5, 0.29289],
      [0.8, 0.69098],
      [1, 1],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(sine(input)).to.be.closeTo(expected, 0.0001, `sine(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same output with sine itself', () => {
      const inputs = [0.053, 0.284, 0.436, 0.721, 0.819]

      inputs.forEach((input) => {
        expect(sine.in(input)).to.be.closeTo(sine(input), 0.0001, `sine.in(${input}) is far from sine(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should return sine-like ease-out output with its input', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.2, 0.30902],
        [0.5, 0.70711],
        [0.8, 0.95106],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(sine.out(input)).to.be.closeTo(expected, 0.0001, `sine.out(${input}) is far from ${expected}`)
      })
    })
  })

  describe('inout', () => {
    it('should return sine-like ease-in output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.02447],
        [0.2, 0.09549],
        [0.3, 0.20611],
        [0.4, 0.34549],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(sine.inout(input)).to.be.closeTo(expected, 0.0001, `sine.inout(${input}) is far from ${expected}`)
      })
    })

    it('should return a value around 0.5 with the input of 0.5', () => {
      expect(sine.inout(0.5)).to.be.closeTo(0.5, 0.0001, `sine.inout(0.5) is far from 0.5`)
    })

    it('should return sine-like ease-out output with its input larger than 0.5', () => {
      const inputExpectedPairs = [
        [0.7, 0.79389],
        [0.8, 0.90451],
        [0.9, 0.97553],
        [0.95, 0.99384],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(sine.inout(input)).to.be.closeTo(expected, 0.0001, `sine.inout(${input}) is far from ${expected}`)
      })
    })
  })
})
