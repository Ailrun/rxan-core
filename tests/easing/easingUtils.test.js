import sinon from 'sinon'

import { asEaseInOut, asEaseOut, withDomainChecker } from '../../src/easing/easingUtils'

describe('asEaseOut', () => {
  it('should return ease-out version of easing function', () => {
    const testEasing = (x) => 1 - x
    const easeOutVersion = asEaseOut(testEasing)

    expect(easeOutVersion(0.2)).to.be.closeTo(1 - testEasing(0.8), 0.0001)
    expect(easeOutVersion(0.5)).to.be.closeTo(1 - testEasing(0.5), 0.0001)
    expect(easeOutVersion(0.7)).to.be.closeTo(1 - testEasing(0.3), 0.0001)
  })
})

describe('asEaseInOut', () => {
  it('should return ease-in-and-out version of easing function', () => {
    const testEasing = (x) => x * x
    const easeInOutVersion = asEaseInOut(testEasing)

    expect(easeInOutVersion(0.2)).to.be.closeTo(testEasing(0.4) / 2, 0.0001)
    expect(easeInOutVersion(0.4)).to.be.closeTo(testEasing(0.8) / 2, 0.0001)
    expect(easeInOutVersion(0.5)).to.be.closeTo(0.5, 0.0001)
    expect(easeInOutVersion(0.7)).to.be.closeTo(1 - testEasing(0.6) / 2, 0.0001)
    expect(easeInOutVersion(0.9)).to.be.closeTo(1 - testEasing(0.2) / 2, 0.0001)
  })
})

describe('withDomainChecker', () => {
  it('should throw an error when passed function does not have any of in, out, inout properties', () => {
    const example = sinon.spy()
    expect(() => withDomainChecker(example))
      .to.throw(TypeError)

    example.in = sinon.spy()
    expect(() => withDomainChecker(example))
      .to.throw(TypeError)
    delete example.in

    example.out = sinon.spy()
    expect(() => withDomainChecker(example))
      .to.throw(TypeError)
    delete example.out

    example.inout = sinon.spy()
    expect(() => withDomainChecker(example))
      .to.throw(TypeError)
    delete example.inout

    example.in = sinon.spy()
    example.out = sinon.spy()
    expect(() => withDomainChecker(example))
      .to.throw(TypeError)
    delete example.in
    delete example.out

    example.in = sinon.spy()
    example.inout = sinon.spy()
    expect(() => withDomainChecker(example))
      .to.throw(TypeError)
    delete example.in
    delete example.inout

    example.out = sinon.spy()
    example.inout = sinon.spy()
    expect(() => withDomainChecker(example))
      .to.throw(TypeError)
    delete example.out
    delete example.inout
  })

  it('should throw no errors when passed function has in, out, inout properties', () => {
    const example = sinon.spy()
    example.in = sinon.spy()
    example.out = sinon.spy()
    example.inout = sinon.spy()
    expect(() => withDomainChecker(example))
      .not.to.throw(TypeError)
  })

  it('should return a function that throws an error when input value is smaller than 0', () => {
    const example = sinon.spy()
    example.in = sinon.spy()
    example.out = sinon.spy()
    example.inout = sinon.spy()
    const result = withDomainChecker(example)

    expect(() => result(-Number.EPSILON))
      .to.throw(RangeError)
  })

  it('should return a function that throws an error when input value is greater than 1', () => {
    const example = sinon.spy()
    example.in = sinon.spy()
    example.out = sinon.spy()
    example.inout = sinon.spy()
    const result = withDomainChecker(example)

    expect(() => result(1.1))
      .to.throw(RangeError)
  })

  it('should return a function that passes an argument to inner (passed) function', () => {
    const example = sinon.spy()
    example.in = sinon.spy()
    example.out = sinon.spy()
    example.inout = sinon.spy()
    const result = withDomainChecker(example)

    result(0.9)
    expect(example.lastCall.calledWith(0.9)).to.be.true
    result(0.3)
    expect(example.lastCall.calledWith(0.3)).to.be.true
  })

  it('should return a function that return a result of inner (passed) function', () => {
    const example = sinon.spy((x) => x * x - x + 1)
    example.in = sinon.spy()
    example.out = sinon.spy()
    example.inout = sinon.spy()
    const result = withDomainChecker(example)

    expect(result(0.3)).to.be.closeTo(example.lastCall.returnValue, 0.0001)
    expect(result(0.74)).to.be.closeTo(example.lastCall.returnValue, 0.0001)
    expect(result(0.41285)).to.be.closeTo(example.lastCall.returnValue, 0.0001)
    expect(result(0.012)).to.be.closeTo(example.lastCall.returnValue, 0.0001)
  })
})
