import { circle } from '../../src/easing/circle'

describe('circle', () => {
  it('should return circle-like ease-in output with its input', () => {
    const inputExpectedPairs = [
      [0, 0],
      [0.1, 0.00501],
      [0.2, 0.0202],
      [0.4, 0.08348],
      [0.6, 0.2],
      [0.8, 0.4],
      [0.9, 0.56411],
      [1, 1],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(circle(input)).to.be.closeTo(expected, 0.0001, `circle(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same output with circle itself', () => {
      const inputs = [0, 0.1, 0.2112, 0.301, 0.495, 0.61, 0.712, 0.891, 1]

      inputs.forEach((input) => {
        expect(circle.in(input)).to.be.closeTo(circle(input), 0.0001, `circle.in(${input}) is far from circle(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should return ease-out circleing output with its input', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.43589],
        [0.2, 0.6],
        [0.4, 0.8],
        [0.6, 0.91652],
        [0.8, 0.9798],
        [0.9, 0.995],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(circle.out(input)).to.be.closeTo(expected, 0.0001, `circle.out(${input}) is far from ${expected}`)
      })
    })
  })

  describe('inout', () => {
    it('should return ease-in circleing output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 0.0101],
        [0.2, 0.04174],
        [0.3, 0.1],
        [0.4, 0.2],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(circle.inout(input)).to.be.closeTo(expected, 0.0001, `circle.inout(${input}) is far from ${expected}`)
      })
    })

    it('should return a value around 0.5 with the input of 0.5', () => {
      expect(circle.inout(0.5)).to.be.closeTo(0.5, 0.0001, `circle.inout(0.5) is far from 0.5`)
    })

    it('should return ease-out circleing output with its input larger than 0.5', () => {
      const inputExpectedPairs = [
        [0.6, 0.8],
        [0.7, 0.9],
        [0.8, 0.95826],
        [0.9, 0.9899],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(circle.inout(input)).to.be.closeTo(expected, 0.0001, `circle.inout(${input}) is far from ${expected}`)
      })
    })
  })
})
