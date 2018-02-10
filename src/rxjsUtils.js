import { Scheduler as rxScheduler } from 'rxjs'

const asap = rxScheduler.asapScheduler ? rxScheduler.asapScheduler : rxScheduler.asap
const async = rxScheduler.asyncScheduler ? rxScheduler.asyncScheduler : rxScheduler.async
const queue = rxScheduler.queueScheduler ? rxScheduler.queueScheduler : rxScheduler.queue
const animationFrame = rxScheduler.animationFrameScheduler ? rxScheduler.animationFrameScheduler : rxScheduler.animationFrame

const Scheduler = {
  asap,
  async,
  queue,
  animationFrame,
}

export {
  Scheduler,
}
