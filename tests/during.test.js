import sinon from 'sinon'

import { Scheduler } from '../src/rxjsUtils'
import { during } from '../src/during'

const { animationFrame, asap, async, queue } = Scheduler

describe('during', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.useFakeTimers({
      now: 0,
    })
    sandbox.clock.tick(0)

    sandbox.stub(animationFrame, 'now').callsFake(Date.now)
    sandbox.stub(asap, 'now').callsFake(Date.now)
    /**
     * @fixme current async does not work well with sinon.
     * sinon does not work well with
     * `setInterval(() => {}, 0)`
     */
    /*
    sandbox.stub(async, 'now').callsFake(Date.now)
    */
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should work without a scheduler', () => {
    expect(() => {
      during()(10).subscribe(sandbox.spy())
    }).to.not.throw()

    sandbox.clock.tick(10)
  })

  it('should work with any rxjs scheduler except Scheduler.queue', () => {
    expect(() => {
      during(asap)(200).subscribe(sandbox.spy())
    }).to.not.throw()
    expect(() => {
      during(animationFrame)(200).subscribe(sandbox.spy())
    }).to.not.throw()
    /**
     * @fixme current async does not work well with sinon.
     * sinon does not work well with
     * `setInterval(() => {}, 0)`
     */
    /*
    expect(() => {
      during(async)(200).subscribe(sandbox.spy())
    }).to.not.throw()
    */

    sandbox.clock.tick(200)
  })

  it('should not work with non-scheduler first argument', () => {
    expect(() => during(sandbox)(500).subscribe(sandbox.spy())).to.throw(/Scheduler/)
  })

  it('should not work with non-number second argument', () => {
    expect(() => during()('a').subscribe(sandbox.spy())).to.throw(/duration/)
  })

  it('should not work with negative second argument', () => {
    expect(() => during()(-20).subscribe(sandbox.spy())).to.throw(/duration/)
  })

  it('should not work with second argument of 0', () => {
    expect(() => during()(0).subscribe(sandbox.spy())).to.throw(/duration/)
  })

  it('should emit value from 0 to 1', () => {
    const usePercent = sandbox.spy()

    during(asap)(500).subscribe(usePercent)

    asap.flush()
    sandbox.clock.tick(500)
    asap.flush()

    let firstValue
    let lastValue

    usePercent.getCalls().forEach(({ args }) => {
      if (lastValue !== undefined) {
        expect(args[0]).to.be.at.least(lastValue)
      }

      expect(args[0]).to.be.within(0, 1)

      if (firstValue === undefined) {
        firstValue = args[0]
      }

      lastValue = args[0]
    })

    expect(firstValue).to.equal(0, 'first value is not 0')
    expect(lastValue).to.equal(1, 'last value is not 1')
  })
})
