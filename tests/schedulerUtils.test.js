import sinon from 'sinon'

import { Scheduler } from '../src/rxjsUtils'
import {
  withDefaultScheduler, withSchedulerChecker, withScheduler,
} from '../src/schedulerUtils'

const { async, queue, asap, animationFrame } = Scheduler

describe('schedulerUtils', () => {
  describe('withDefaultScheduler', () => {
    it('should pass animation scheduler to first argument when there is no second argument', () => {
      const fst = sinon.spy()

      withDefaultScheduler(fst)()
      expect(fst.calledOnce, 'first argument is not called once')
        .to.be.true
      expect(fst.lastCall.calledWith(animationFrame), 'first argument is not called with second argument')
        .to.be.true
    })

    it('should pass animation scheduler to first argument when second argument is undefined', () => {
      const fst = sinon.spy()

      withDefaultScheduler(fst)(undefined)
      expect(fst.calledOnce, 'first argument is not called once')
        .to.be.true
      expect(fst.lastCall.calledWith(animationFrame), 'first argument is not called with second argument')
        .to.be.true
    })

    it('should pass defined second argument to first argument', () => {
      const fst = sinon.spy()

      withDefaultScheduler(fst)(1)
      expect(fst.calledOnce, 'first argument is not called once')
        .to.be.true
      expect(fst.lastCall.calledWith(1), 'first argument is not called with second argument')
        .to.be.true
    })

    it('should not work when first argument is not callable', () => {
      expect(() => withDefaultScheduler(1)())
        .to.throw(TypeError, undefined, 'it does not throw error without second argument')
      expect(() => withDefaultScheduler(1)('a'))
        .to.throw(TypeError, undefined, 'it does not throw error with second argument')
    })
  })

  describe('withSchedulerChecker', () => {
    it('should pass second argument of rxjs scheduler to first argument', () => {
      const fst = sinon.spy()

      withSchedulerChecker(fst)(asap)
      expect(fst.callCount)
        .to.equal(1)
      expect(fst.lastCall.calledWith(asap))
        .to.be.true

      withSchedulerChecker(fst)(animationFrame)
      expect(fst.callCount)
        .to.equal(2)
      expect(fst.lastCall.calledWith(animationFrame))
        .to.be.true

      withSchedulerChecker(fst)(queue)
      expect(fst.callCount)
        .to.equal(3)
      expect(fst.lastCall.calledWith(queue))
        .to.be.true

      withSchedulerChecker(fst)(async)
      expect(fst.callCount)
        .to.equal(4)
      expect(fst.lastCall.calledWith(async))
        .to.be.true
    })

    it('should not work when first argument is not a function', () => {
      expect(() => withSchedulerChecker(undefined)(animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with undefined')
      expect(() => withSchedulerChecker(1)(animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with 1')
      expect(() => withSchedulerChecker(true)(animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with true')
      expect(() => withSchedulerChecker([2, 3])(animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with [2, 3]')
    })

    it('should not work when second argument is not an instance of rxjs scheduler', () => {
      const fst = sinon.spy()

      expect(() => withSchedulerChecker(fst)(undefined))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with undefined')
      expect(() => withSchedulerChecker(fst)(null))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with null')
      expect(() => withSchedulerChecker(fst)(1))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with 1')
      expect(() => withSchedulerChecker(fst)([2, 3]))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with [2, 3]')
      expect(() => withSchedulerChecker(fst)({ x: 5 }))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with { x: 5 }')
    })
  })

  describe('withScheduler', () => {
    it('should pass second argument of rxjs scheduler to first argument', () => {
      const fst = sinon.spy()

      withScheduler(fst)(asap)
      expect(fst.callCount)
        .to.equal(1)
      expect(fst.lastCall.calledWith(asap))
        .to.be.true

      withScheduler(fst)(animationFrame)
      expect(fst.callCount)
        .to.equal(2)
      expect(fst.lastCall.calledWith(animationFrame))
        .to.be.true

      withScheduler(fst)(queue)
      expect(fst.callCount)
        .to.equal(3)
      expect(fst.lastCall.calledWith(queue))
        .to.be.true

      withScheduler(fst)(async)
      expect(fst.callCount)
        .to.equal(4)
      expect(fst.lastCall.calledWith(async))
        .to.be.true
    })

    it('should pass animation scheduler to first argument when second argument is undefined', () => {
      const fst = sinon.spy()

      withScheduler(fst)(undefined)
      expect(fst.calledOnce, 'first argument is not called once')
        .to.be.true
      expect(fst.lastCall.calledWith(animationFrame), 'first argument is not called with second argument')
        .to.be.true
    })

    it('should not work when first argument is not a function', () => {
      expect(() => withScheduler(undefined)(animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with undefined')
      expect(() => withScheduler(1)(animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with 1')
      expect(() => withScheduler(true)(Scheduler.animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with true')
      expect(() => withScheduler([2, 3])(Scheduler.animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with [2, 3]')
    })

    it('should not work when second argument is not an instance of rxjs scheduler', () => {
      const fst = sinon.spy()

      expect(() => withScheduler(fst)(null))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with null')
      expect(() => withScheduler(fst)(1))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with 1')
      expect(() => withScheduler(fst)([2, 3]))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with [2, 3]')
      expect(() => withScheduler(fst)({ x: 5 }))
        .to.throw(TypeError, /Scheduler/, 'it does not throw error with { x: 5 }')
    })
  })
})
