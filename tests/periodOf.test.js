import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  queueScheduler,
} from 'rxjs'
import sinon from 'sinon'

import { periodOf } from '../src/periodOf'

describe('periodOf', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.useFakeTimers()
    sandbox.clock.tick(0)

    sandbox.stub(animationFrameScheduler, 'now').callsFake(() => 0)
    sandbox.stub(asapScheduler, 'now').callsFake(Date.now)
    /**
     * @fixme current async does not work well with sinon.
     * sinon does not work well with
     * `setInterval(() => {}, 0)`
     */
    /*
    sandbox.stub(async, 'now').callsFake(Date.now)
    */
    sandbox.stub(queueScheduler, 'now').callsFake(Date.now)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should work without a scheduler and cycles', () => {
    let subscription

    expect(() => {
      subscription = periodOf()(100).subscribe(sandbox.spy())
    }).not.to.throw()

    sandbox.clock.tick(300)

    subscription.unsubscribe()
  })

  it('should work without a scheduler', () => {
    let subscription

    expect(() => {
      subscription = periodOf()(100, 2).subscribe(sandbox.spy())
    }).not.to.throw()

    sandbox.clock.tick(300)

    subscription.unsubscribe()
  })

  it('should work with any rxjs scheduler', () => {
    const subscriptions = []

    expect(() => {
      subscriptions.push(periodOf(queueScheduler)(100).subscribe(sandbox.spy()))
    }).to.not.throw()
    expect(() => {
      subscriptions.push(periodOf(asapScheduler)(100).subscribe(sandbox.spy()))
    }).to.not.throw()
    expect(() => {
      subscriptions.push(periodOf(animationFrameScheduler)(100).subscribe(sandbox.spy()))
    }).to.not.throw()
    /**
     * @fixme current async does not work well with sinon.
     * sinon does not work well with
     * `setInterval(() => {}, 0)`
     */
    /*
    expect(() => {
      subscriptions.push(periodOf(async)(100).subscribe(sandbox.spy()))
    }).to.not.throw()
    */

    sandbox.clock.tick(300)

    subscriptions.forEach((subscription) => subscription.unsubscribe())
  })

  it('should not work with non-scheduler first argument', () => {
    expect(() => {
      periodOf(sandbox)(100).subscribe(sandbox.spy())
    }).to.throw(/Scheduler/)
  })

  it('should not work with non-number second argument', () => {
    expect(() => {
      periodOf()('erw').subscribe(sandbox.spy())
    }).to.throw(/period/)
  })

  it('should not work with negative second argument', () => {
    expect(() => {
      periodOf()(-20).subscribe(sandbox.spy())
    }).to.throw(/period/)
  })

  it('should not work with non-number defined third argument', () => {
    expect(() => {
      periodOf()(100, 'fwfw').subscribe(sandbox.spy())
    }).to.throw(/cycles/)
  })

  it('should not work with negative third argument', () => {
    expect(() => {
      periodOf()(100, -2).subscribe(sandbox.spy())
    }).to.throw(/cycles/)
  })

  it('should emit values from 1 to infinite when third argument is undefined', () => {
    const next = sandbox.spy()
    let subscription = periodOf(asapScheduler)(100).subscribe(next)
    let lastCycle = 0

    for (let i = 0; i < 100; i++) {
      sandbox.clock.tick(300)

      next.getCalls().forEach(({ args }) => {
        lastCycle++
        expect(args[0]).to.equal(lastCycle)
      })

      expect(lastCycle).to.equal(3 * (i + 1))
      next.resetHistory()
    }

    subscription.unsubscribe()
  })

  it('should emit value from 1 to defined third argument', () => {
    const next = sandbox.spy()
    const complete = sandbox.spy()
    const cycles = 3
    let subscription = periodOf(asapScheduler)(100, cycles).subscribe(next, undefined, complete)

    sandbox.clock.tick(300)

    let lastCycle = 0

    next.getCalls().forEach(({ args }) => {
      lastCycle++
      expect(args[0]).to.equal(lastCycle)
    })

    expect(lastCycle).to.equal(cycles)
    expect(complete.called).to.be.true
    subscription.unsubscribe()
  })
})
