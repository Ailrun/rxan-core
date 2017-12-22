import { elastic } from '../../src/easing/elastic'

describe('elastic', () => {
  it('should return elastically ease-in output with its input', () => {
    const inputExpectedPairs = [
      [0, 0],
      [0.1, 0.00174],
      [0.3, -0.00121],
      [0.6, -0.0193],
      [0.7, 0.12346],
      [0.9, -0.22699],
      [1, 1],
    ]

    inputExpectedPairs.forEach(([input, expected]) => {
      expect(elastic(input)).to.be.closeTo(expected, 0.0001, `elastic(${input}) is far from ${expected}`)
    })
  })

  describe('in', () => {
    it('should make same output with elastic itself', () => {
      const inputs = [0, 0.1, 0.24, 0.3425, 0.5502, 0.792, 0.9, 1]

      inputs.forEach((input) => {
        expect(elastic.in(input)).to.be.closeTo(elastic(input), 0.0001, `elastic.in(${input}) is far from elastic(${input})`)
      })
    })
  })

  describe('out', () => {
    it('should return elastically ease-out output with its input', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, 1.227],
        [0.2, 1.14695],
        [0.4, 1.01931],
        [0.6, 0.98514],
        [0.9, 0.99826],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(elastic.out(input)).to.be.closeTo(expected, 0.0001, `elastic.out(${input}) is far from ${expected}`)
      })
    })
  })

  describe('inout', () => {
    it('should return elastically ease-in output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0, 0],
        [0.1, -0.00157],
        [0.2, 0.00743],
        [0.3, -0.00965],
        [0.4, -0.07346],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(elastic.inout(input)).to.be.closeTo(expected, 0.0001, `elastic.inout(${input}) is far from ${expected}`)
      })
    })

    it('should return a value around 0.5 with the input of 0.5', () => {
      expect(elastic.inout(0.5)).to.be.closeTo(0.5, 0.0001, `elastic.inout(0.5) is far from 0.5`)
    })
    
    it('should return elastically ease-in output with its input smaller than 0.5', () => {
      const inputExpectedPairs = [
        [0.52, 0.74061],
        [0.61, 1.02374],
        [0.68, 0.98014],
        [0.82, 0.99481],
        [0.9, 1.00158],
        [1, 1],
      ]

      inputExpectedPairs.forEach(([input, expected]) => {
        expect(elastic.inout(input)).to.be.closeTo(expected, 0.0001, `elastic.inout(${input}) is far from ${expected}`)
      })
    })
  })
})
