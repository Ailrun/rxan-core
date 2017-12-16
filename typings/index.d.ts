import { Observable } from 'rxjs/Observable'
import { Scheduler } from 'rxjs/Scheduler'

declare namespace Rxan {
  const msElasped: (scheduler?: Scheduler) => Observable<number>
  const during: (scheduler?: Scheduler) => (duration: number) => Observable<number>

  module easing {
    interface EasingFunc {
      (percent: number): number;
      in: EasingFunc;
      out: (percent: number) => number;
    }
    const linear: EasingFunc
    const quadratic: EasingFunc
    const cubic: EasingFunc
    const exponential: EasingFunc
    const sine: EasingFunc
    const elastic: EasingFunc
  }
}

export = Rxan
