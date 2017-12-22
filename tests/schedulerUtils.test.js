import { Scheduler } from 'rxjs'
import sinon from 'sinon'

import {
  withDefaultScheduler, withSchedulerChecker, withScheduler,
} from '../src/schedulerUtils'

describe('schedulerUtils', () => {
  describe('withDefaultScheduler', () => {
    it('should pass animation scheduler to first argument when there is no second argument', () => {
      const fst = sinon.spy()

      withDefaultScheduler(fst)()
      expect(fst.calledOnce)
        .to.equal(true, 'first argument is not called once')
      expect(fst.lastCall.calledWith(Scheduler.animationFrame))
        .to.equal(true, 'first argument is not called with seconed argument')
    })

    it('should pass animation scheduler to first argument when second argument is undefined', () => {
      const fst = sinon.spy()

      withDefaultScheduler(fst)(undefined)
      expect(fst.calledOnce)
        .to.equal(true, 'first argument is not called once')
      expect(fst.lastCall.calledWith(Scheduler.animationFrame))
        .to.equal(true, 'first argument is not called with seconed argument')
    })

    it('should pass defined second argument to first argument', () => {
      const fst = sinon.spy()

      withDefaultScheduler(fst)(1)
      expect(fst.calledOnce)
        .to.equal(true, 'first argument is not called once')
      expect(fst.lastCall.calledWith(1))
        .to.equal(true, 'first argument is not called with seconed argument')
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

      withSchedulerChecker(fst)(Scheduler.asap)
      expect(fst.callCount)
        .to.be.equal(1)
      expect(fst.lastCall.calledWith(Scheduler.asap))
        .to.be.equal(true)

      withSchedulerChecker(fst)(Scheduler.animationFrame)
      expect(fst.callCount)
        .to.be.equal(2)
      expect(fst.lastCall.calledWith(Scheduler.animationFrame))
        .to.be.equal(true)

      withSchedulerChecker(fst)(Scheduler.queue)
      expect(fst.callCount)
        .to.be.equal(3)
      expect(fst.lastCall.calledWith(Scheduler.queue))
        .to.be.equal(true)

      withSchedulerChecker(fst)(Scheduler.async)
      expect(fst.callCount)
        .to.be.equal(4)
      expect(fst.lastCall.calledWith(Scheduler.async))
        .to.be.equal(true)
    })

    it('should not work when first argument is not a function', () => {
      expect(() => withSchedulerChecker(undefined)(Scheduler.animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with undefined')
      expect(() => withSchedulerChecker(1)(Scheduler.animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with 1')
      expect(() => withSchedulerChecker(true)(Scheduler.animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with true')
      expect(() => withSchedulerChecker([2, 3])(Scheduler.animationFrame))
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

      withScheduler(fst)(Scheduler.asap)
      expect(fst.callCount)
        .to.be.equal(1)
      expect(fst.lastCall.calledWith(Scheduler.asap))
        .to.be.equal(true)

      withScheduler(fst)(Scheduler.animationFrame)
      expect(fst.callCount)
        .to.be.equal(2)
      expect(fst.lastCall.calledWith(Scheduler.animationFrame))
        .to.be.equal(true)

      withScheduler(fst)(Scheduler.queue)
      expect(fst.callCount)
        .to.be.equal(3)
      expect(fst.lastCall.calledWith(Scheduler.queue))
        .to.be.equal(true)

      withScheduler(fst)(Scheduler.async)
      expect(fst.callCount)
        .to.be.equal(4)
      expect(fst.lastCall.calledWith(Scheduler.async))
        .to.be.equal(true)
    })

    it('should pass animation scheduler to first argument when second argument is undefined', () => {
      const fst = sinon.spy()

      withScheduler(fst)(undefined)
      expect(fst.calledOnce)
        .to.equal(true, 'first argument is not called once')
      expect(fst.lastCall.calledWith(Scheduler.animationFrame))
        .to.equal(true, 'first argument is not called with seconed argument')
    })

    it('should not work when first argument is not a function', () => {
      expect(() => withScheduler(undefined)(Scheduler.animationFrame))
        .to.throw(TypeError, undefined, 'it does not throw error with undefined')
      expect(() => withScheduler(1)(Scheduler.animationFrame))
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
