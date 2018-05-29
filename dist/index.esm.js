import { async as async$1 } from 'rxjs/scheduler/async';
import { animationFrame as animationFrame$1 } from 'rxjs/scheduler/animationFrame';
import { defer as defer$1 } from 'rxjs/observable/defer';
import { interval as interval$1 } from 'rxjs/observable/interval';
import { map as map$1 } from 'rxjs/operators/map';
import { concat as concat$1 } from 'rxjs/observable/concat';
import { takeWhile as takeWhile$1 } from 'rxjs/operators/takeWhile';
import { take as take$1 } from 'rxjs/operators/take';

var SchedulerConstructor = Object.getPrototypeOf(Object.getPrototypeOf(async$1)).constructor;
var defaultScheduler = animationFrame$1;

var withDefaultScheduler = function withDefaultScheduler(f) {
  return function () {
    var scheduler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultScheduler;
    return f(scheduler);
  };
};

var buildSchedulerTypeError = function buildSchedulerTypeError(name) {
  var errorMessage = 'scheduler parameter for ' + name + ' is not an instance of Scheduler';

  return new TypeError(errorMessage);
};
var withSchedulerChecker = function withSchedulerChecker(f) {
  return function (scheduler) {
    if (!(scheduler instanceof SchedulerConstructor)) {
      throw buildSchedulerTypeError(f.name);
    }

    return f(scheduler);
  };
};

var withScheduler = function withScheduler(f) {
  return withDefaultScheduler(withSchedulerChecker(f));
};

var msElapsed$1 = function msElapsed(scheduler) {
  return defer$1(function () {
    var startTime = scheduler.now();

    return interval$1(0, scheduler).pipe(map$1(function () {
      return scheduler.now() - startTime;
    }));
  });
};

var msElapsed$$1 = withScheduler(msElapsed$1);

var durationTypeErrorMessage = 'second argument (duration) of during should be a number';
var durationRangeErrorMessage = 'second argument (duration) of during should be a positive number';

var during$1 = function during(scheduler) {
  return function (duration) {
    if (typeof duration !== 'number') {
      throw new TypeError(durationTypeErrorMessage);
    }

    if (duration <= 0) {
      throw new RangeError(durationRangeErrorMessage);
    }

    return msElapsed$1(scheduler).pipe(map$1(function (ms) {
      return ms / duration;
    }), takeWhile$1(function (percent) {
      return percent < 1;
    }), function (res$) {
      return concat$1(res$, [1]);
    });
  };
};

var during$$1 = withScheduler(during$1);

var periodTypeErrorMessage = 'second argument (period) of periodOf should be a number';
var periodRangeErrorMessage = 'second argument (period) of periodOf should be a positive number';

var cyclesTypeErrorMessage = 'third argument (cycles) of periodOf should be undefined or a number';
var cyclesRangeErrorMessage = 'third argument (cycles) of periodOf should be a positive number';

var periodOf$1 = function periodOf(scheduler) {
  return function (period, cycles) {
    if (typeof period !== 'number') {
      throw new TypeError(periodTypeErrorMessage);
    }

    if (period <= 0) {
      throw new RangeError(periodRangeErrorMessage);
    }

    if (cycles) {
      if (typeof cycles !== 'number') {
        throw new TypeError(cyclesTypeErrorMessage);
      }

      if (cycles <= 0) {
        throw new RangeError(cyclesRangeErrorMessage);
      }
    }

    cycles = cycles || Number.POSITIVE_INFINITY;

    return interval$1(period, scheduler).pipe(map$1(function (cycle) {
      return cycle + 1;
    }), take$1(cycles));
  };
};

var periodOf$$1 = withScheduler(periodOf$1);

var periodTypeErrorMessage$1 = 'second argument (period) of toggle should be a number';
var periodRangeErrorMessage$1 = 'second argument (period) of toggle should be a positive number';

var cyclesTypeErrorMessage$1 = 'third argument (cycles) of toggle should be undefined or a number';
var cyclesRangeErrorMessage$1 = 'third argument (cycles) of toggle should be a positive number';

var toggle$1 = function toggle(scheduler) {
  return function (period, cycles) {
    if (typeof period !== 'number') {
      throw new TypeError(periodTypeErrorMessage$1);
    }

    if (period <= 0) {
      throw new RangeError(periodRangeErrorMessage$1);
    }

    if (cycles) {
      if (typeof cycles !== 'number') {
        throw new TypeError(cyclesTypeErrorMessage$1);
      }

      if (cycles <= 0) {
        throw new RangeError(cyclesRangeErrorMessage$1);
      }
    }

    cycles = cycles || Number.POSITIVE_INFINITY;

    return interval$1(period, scheduler).pipe(map$1(function (cycle) {
      return cycle % 2 === 0;
    }), take$1(cycles));
  };
};

var toggle$$1 = withScheduler(toggle$1);

var buildRangeError = function buildRangeError(name) {
  var errorMessage = "input of " + name + " should be smaller than 1, and larger than 0";

  return new RangeError(errorMessage);
};
var buildTypeError = function buildTypeError() {
  var errorMessage = "input of withDomainChecker should have in, out, inout property.";

  return new TypeError(errorMessage);
};

var withDomainCheckerImpl = function withDomainCheckerImpl(f) {
  return function (x) {
    if (x < 0 || x > 1) {
      throw buildRangeError(f.name);
    }

    return f(x);
  };
};
var withDomainChecker = function withDomainChecker(f) {
  if (!f.in || !f.out || !f.inout) {
    throw buildTypeError();
  }

  var newF = withDomainCheckerImpl(f);
  newF.in = withDomainCheckerImpl(f.in);
  newF.out = withDomainCheckerImpl(f.out);
  newF.inout = withDomainCheckerImpl(f.inout);

  return newF;
};

var asEaseOut = function asEaseOut(f) {
  return function (x) {
    return 1 - f(1 - x);
  };
};
var asEaseInOut = function asEaseInOut(f) {
  return function (x) {
    return x < 0.5 ? f(2 * x) / 2 : 1 - f(2 * (1 - x)) / 2;
  };
};

var linear$1 = function linear(x) {
  return x;
};

linear$1.in = linear$1;
linear$1.out = asEaseOut(linear$1);
linear$1.inout = asEaseInOut(linear$1);

var quadratic$1 = function quadratic(x) {
  return x * x;
};

quadratic$1.in = quadratic$1;
quadratic$1.out = asEaseOut(quadratic$1);
quadratic$1.inout = asEaseInOut(quadratic$1);

var cubic$1 = function cubic(x) {
  return x * x * x;
};

cubic$1.in = cubic$1;
cubic$1.out = asEaseOut(cubic$1);
cubic$1.inout = asEaseInOut(cubic$1);

var sine$1 = function sine(x) {
  return 1 - Math.cos(x * Math.PI / 2);
};

sine$1.in = sine$1;
sine$1.out = function (x) {
  return Math.sin(x * Math.PI / 2);
};
sine$1.inout = function (x) {
  return (1 - Math.cos(x * Math.PI)) / 2;
};

var exponential$1 = function exponential(x) {
  return x === 0 ? 0 : Math.pow(2, 10 * (x - 1));
};

exponential$1.in = exponential$1;
exponential$1.out = asEaseOut(exponential$1);
exponential$1.inout = asEaseInOut(exponential$1);

var PI = Math.PI;
var pow = Math.pow;
var sin = Math.sin;


var elastic$1 = function elastic(t) {
  return t === 0 ? 0 : pow(2, 10 * (t - 1)) * sin(t * (13 / 2) * PI);
};

elastic$1.in = elastic$1;
elastic$1.out = asEaseOut(elastic$1);
elastic$1.inout = asEaseInOut(elastic$1);

var circle$1 = function circle(t) {
  return 1 - Math.sqrt(1 - t * t);
};

circle$1.in = circle$1;
circle$1.out = asEaseOut(circle$1);
circle$1.inout = asEaseInOut(circle$1);

var back$1 = function back(t) {
  return t * t * (Math.E * t - Math.E + 1);
};

back$1.in = back$1;
back$1.out = asEaseOut(back$1);
back$1.inout = asEaseInOut(back$1);

var linear$$1 = withDomainChecker(linear$1);
var quadratic$$1 = withDomainChecker(quadratic$1);
var cubic$$1 = withDomainChecker(cubic$1);
var sine$$1 = withDomainChecker(sine$1);
var exponential$$1 = withDomainChecker(exponential$1);
var elastic$$1 = withDomainChecker(elastic$1);
var circle$$1 = withDomainChecker(circle$1);
var back$$1 = withDomainChecker(back$1);



var index = Object.freeze({
	linear: linear$$1,
	quadratic: quadratic$$1,
	cubic: cubic$$1,
	sine: sine$$1,
	exponential: exponential$$1,
	elastic: elastic$$1,
	circle: circle$$1,
	back: back$$1
});

export { msElapsed$$1 as msElapsed, during$$1 as during, periodOf$$1 as periodOf, toggle$$1 as toggle, index as easing };
//# sourceMappingURL=index.esm.js.map
