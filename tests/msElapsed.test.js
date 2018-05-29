import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  queueScheduler,
} from 'rxjs'
import sinon from 'sinon'
import createStub from 'raf-stub';

import { msElapsed } from '../src/msElapsed'

describe('msElapsed', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.useFakeTimers({
      now: 0,
    })
    sandbox.clock.tick(0)

    const stub = createStub();
    sandbox.stub(global, 'requestAnimationFrame').callsFake(stub.add)
    sandbox.stub(animationFrameScheduler, 'now').callsFake(Date.now)
    sandbox.stub(asapScheduler, 'now').callsFake(Date.now)
    /**
     * @fixme current async does not work well with sinon.
     * sinon does not work well with
     * `setInterval(() => {}, 0)`
     */
    /*
    sandbox.stub(asyncScheduler, 'now').callsFake(Date.now)
    */
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should work without a scheduler', () => {
    let subscription

    expect(() => {
      subscription = msElapsed().subscribe(sandbox.spy())
    }).to.not.throw()

    sandbox.clock.tick(10)

    subscription.unsubscribe()
  })

  it('should work with any rxjs scheduler except Scheduler.queue', () => {
    const subscriptions = []

    expect(() => {
      subscriptions.push(msElapsed(asapScheduler).subscribe(sandbox.spy()))
    }).to.not.throw()
    expect(() => {
      subscriptions.push(msElapsed(animationFrameScheduler).subscribe(sandbox.spy()))
    }).to.not.throw()
    /**
     * @fixme current async does not work well with sinon.
     * sinon does not work well with
     * `setInterval(() => {}, 0)`
     */
    /*
    expect(() => {
      subscriptions.push(msElapsed(asyncScheduler).subscribe(sandbox.spy()))
    }).to.not.throw()
    */

    sandbox.clock.tick(10)

    subscriptions.forEach((subscription) => subscription.unsubscribe())
  })

  it('should not work with non-scheduler argument', () => {
    expect(() => {
      msElapsed(sandbox).subscribe(sandbox.spy())
    }).to.throw(/Scheduler/)
  })

  it('should emit values at least 1 time', () => {
    const useTimes = sandbox.spy()

    const subscription =
      msElapsed(asapScheduler).subscribe(useTimes)

    asapScheduler.flush()

    subscription.unsubscribe()
    expect(useTimes.callCount).to.be.least(1)
  })

  it('should emit time close to when observer called finally', () => {
    const useTimes = sandbox.spy()

    const subscription =
      msElapsed(asapScheduler).subscribe(useTimes)

    asapScheduler.flush()
    sandbox.clock.tick(1000)
    asapScheduler.flush()

    subscription.unsubscribe()
    expect(useTimes.lastCall.args[0]).to.be.closeTo(Date.now(), 1)
  })
})
