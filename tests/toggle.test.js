import sinon from 'sinon'

import { Scheduler } from '../src/rxjsUtils'
import { toggle } from '../src/toggle'

const { animationFrame, asap, async, queue } = Scheduler

describe('toggle', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.useFakeTimers({
      now: 0,
    })
    sandbox.clock.tick(0)

    sandbox.stub(animationFrame, 'now').callsFake(() => 0)
    sandbox.stub(asap, 'now').callsFake(Date.now)
    sandbox.stub(async, 'now').callsFake(Date.now)
    sandbox.stub(queue, 'now').callsFake(Date.now)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should work without a scheduler and cycles', () => {
    let subscription

    expect(() => {
      subscription = toggle()(100).subscribe(sandbox.spy())
    }).not.to.throw()

    sandbox.clock.tick(300)

    subscription.unsubscribe()
  })

  it('should work without a scheduler', () => {
    let subscription

    expect(() => {
      subscription = toggle()(100, 2).subscribe(sandbox.spy())
    }).not.to.throw()

    sandbox.clock.tick(300)

    subscription.unsubscribe()
  })

  it('should work with any rxjs scheduler', () => {
    const subscriptions = []

    expect(() => {
      subscriptions.push(toggle(queue)(100).subscribe(sandbox.spy()))
    }).to.not.throw()
    expect(() => {
      subscriptions.push(toggle(asap)(100).subscribe(sandbox.spy()))
    }).to.not.throw()
    expect(() => {
      subscriptions.push(toggle(animationFrame)(100).subscribe(sandbox.spy()))
    }).to.not.throw()
    expect(() => {
      subscriptions.push(toggle(async)(100).subscribe(sandbox.spy()))
    }).to.not.throw()

    sandbox.clock.tick(300)

    subscriptions.forEach((subscription) => subscription.unsubscribe())
  })

  it('should not work with non-scheduler first argument', () => {
    expect(() => {
      toggle(sandbox)(100).subscribe(sandbox.spy())
    }).to.throw(/Scheduler/)
  })

  it('should not work with non-number second argument', () => {
    expect(() => {
      toggle()('erw').subscribe(sandbox.spy())
    }).to.throw(/period/)
  })

  it('should not work with negative second argument', () => {
    expect(() => {
      toggle()(-20).subscribe(sandbox.spy())
    }).to.throw(/period/)
  })

  it('should not work with non-number defined third argument', () => {
    expect(() => {
      toggle()(100, 'fwfw').subscribe(sandbox.spy())
    }).to.throw(/cycles/)
  })

  it('should not work with negative third argument', () => {
    expect(() => {
      toggle()(100, -2).subscribe(sandbox.spy())
    }).to.throw(/cycles/)
  })

  it('should emit true and false infinitely when third argument is undefined', () => {
    const next = sandbox.spy()
    let subscription = toggle(async)(100).subscribe(next)
    let lastValue = true;
    let lastCycle = 0

    for (let i = 0; i < 100; i++) {
      sandbox.clock.tick(300)

      next.getCalls().forEach(({ args }) => {
        expect(args[0]).to.equal(lastValue);
        lastCycle++
        lastValue = !lastValue;
      })

      expect(lastCycle).to.equal(3 * (i + 1))
      next.reset()
    }

    subscription.unsubscribe()
  })

  it('should emit n times where n is defined third argument', () => {
    const next = sandbox.spy()
    const complete = sandbox.spy()
    const cycles = 3
    let subscription = toggle(async)(100, cycles).subscribe(next, undefined, complete)

    sandbox.clock.tick(300)

    let lastCycle = 0

    next.getCalls().forEach(({ args }) => {
      lastCycle++
    })

    expect(lastCycle).to.equal(cycles)
    expect(complete.called).to.be.true
    subscription.unsubscribe()
  })
})
