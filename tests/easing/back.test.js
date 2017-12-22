import { back } from '../../src/easing/back'

describe('back', () => {
  it('should return ease-in backing output with its input', () => {
    const inputExpectedPairs = [
      [0, 0],
      [0.1, -0.01446],
      [0.3, -0.08125],
      [0.6, -0.03143],
      [0.7, 0.09041],
      [0.9, 0.58981],
      [1, 1],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(back(input)).to.be.closeTo(expected, 0.0001, `back(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same output with back itself', () => {
      const inputs = [0, 0.13, 0.2, 0.3123, 0.401, 0.623, 0.83, 0.9561, 1]

      inputs.forEach((input) => {
        expect(back.in(input)).to.be.closeTo(back(input), 0.0001, `back.in(${input}) is far from back(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should return ease-out backing output with its input', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.41018],
        [0.2, 0.70794],
        [0.4, 1.03143],
        [0.6, 1.10096],
        [0.9, 1.01446],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(back.out(input)).to.be.closeTo(expected, 0.0001, `back.out(${input}) is far from ${expected}`)
      })
    })
  })

  describe('inout', () => {
    it('should return ease-in backing output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, -0.02349],
        [0.2, -0.05048],
        [0.3, -0.01572],
        [0.4, 0.14603],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(back.inout(input)).to.be.closeTo(expected, 0.0001, `back.inout(${input}) is far from ${expected}`)
      })
    })

    it('should return a value around 0.5 with the input of 0.5', () => {
      expect(back.inout(0.5)).to.be.closeTo(0.5, 0.0001, `back.inout(0.5) is far from 0.5`)
    })

    it('should return ease-out backing output with its input larger than 0.5', () => {
      const inputExpectedPairs = [
        [0.6, 0.85397],
        [0.7, 1.01572],
        [0.8, 1.05048],
        [0.9, 1.02349],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(back.inout(input)).to.be.closeTo(expected, 0.0001, `back.inout(${input}) is far from ${expected}`)
      })
    })
  })
})
