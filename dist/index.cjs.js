'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rxjs = require('rxjs');
var operators = require('rxjs/operators');

var defaultScheduler = rxjs.animationFrameScheduler;

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
    if (!(scheduler instanceof rxjs.Scheduler)) {
      throw buildSchedulerTypeError(f.name);
    }

    return f(scheduler);
  };
};

var withScheduler = function withScheduler(f) {
  return withDefaultScheduler(withSchedulerChecker(f));
};

var msElapsed = function msElapsed(scheduler) {
  return rxjs.defer(function () {
    var startTime = scheduler.now();

    return rxjs.interval(0, scheduler).pipe(operators.map(function () {
      return scheduler.now() - startTime;
    }));
  });
};

var msElapsed$1 = withScheduler(msElapsed);

var durationTypeErrorMessage = 'second argument (duration) of during should be a number';
var durationRangeErrorMessage = 'second argument (duration) of during should be a positive number';

var during = function during(scheduler) {
  return function (duration) {
    if (typeof duration !== 'number') {
      throw new TypeError(durationTypeErrorMessage);
    }

    if (duration <= 0) {
      throw new RangeError(durationRangeErrorMessage);
    }

    return msElapsed(scheduler).pipe(operators.map(function (ms) {
      return ms / duration;
    }), operators.takeWhile(function (percent) {
      return percent < 1;
    }), function (res$) {
      return rxjs.concat(res$, [1]);
    });
  };
};

var during$1 = withScheduler(during);

var periodTypeErrorMessage = 'second argument (period) of periodOf should be a number';
var periodRangeErrorMessage = 'second argument (period) of periodOf should be a positive number';

var cyclesTypeErrorMessage = 'third argument (cycles) of periodOf should be undefined or a number';
var cyclesRangeErrorMessage = 'third argument (cycles) of periodOf should be a positive number';

var periodOf = function periodOf(scheduler) {
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

    return rxjs.interval(period, scheduler).pipe(operators.map(function (cycle) {
      return cycle + 1;
    }), operators.take(cycles));
  };
};

var periodOf$1 = withScheduler(periodOf);

var periodTypeErrorMessage$1 = 'second argument (period) of toggle should be a number';
var periodRangeErrorMessage$1 = 'second argument (period) of toggle should be a positive number';

var cyclesTypeErrorMessage$1 = 'third argument (cycles) of toggle should be undefined or a number';
var cyclesRangeErrorMessage$1 = 'third argument (cycles) of toggle should be a positive number';

var toggle = function toggle(scheduler) {
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

    return rxjs.interval(period, scheduler).pipe(operators.map(function (cycle) {
      return cycle % 2 === 0;
    }), operators.take(cycles));
  };
};

var toggle$1 = withScheduler(toggle);

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

var linear = function linear(x) {
  return x;
};

linear.in = linear;
linear.out = asEaseOut(linear);
linear.inout = asEaseInOut(linear);

var quadratic = function quadratic(x) {
  return x * x;
};

quadratic.in = quadratic;
quadratic.out = asEaseOut(quadratic);
quadratic.inout = asEaseInOut(quadratic);

var cubic = function cubic(x) {
  return x * x * x;
};

cubic.in = cubic;
cubic.out = asEaseOut(cubic);
cubic.inout = asEaseInOut(cubic);

var sine = function sine(x) {
  return 1 - Math.cos(x * Math.PI / 2);
};

sine.in = sine;
sine.out = function (x) {
  return Math.sin(x * Math.PI / 2);
};
sine.inout = function (x) {
  return (1 - Math.cos(x * Math.PI)) / 2;
};

var exponential = function exponential(x) {
  return x === 0 ? 0 : Math.pow(2, 10 * (x - 1));
};

exponential.in = exponential;
exponential.out = asEaseOut(exponential);
exponential.inout = asEaseInOut(exponential);

var PI = Math.PI,
    pow = Math.pow,
    sin = Math.sin;


var elastic = function elastic(t) {
  return t === 0 ? 0 : pow(2, 10 * (t - 1)) * sin(t * (13 / 2) * PI);
};

elastic.in = elastic;
elastic.out = asEaseOut(elastic);
elastic.inout = asEaseInOut(elastic);

var circle = function circle(t) {
  return 1 - Math.sqrt(1 - t * t);
};

circle.in = circle;
circle.out = asEaseOut(circle);
circle.inout = asEaseInOut(circle);

var back = function back(t) {
  return t * t * (Math.E * t - Math.E + 1);
};

back.in = back;
back.out = asEaseOut(back);
back.inout = asEaseInOut(back);

var linear$1 = withDomainChecker(linear);
var quadratic$1 = withDomainChecker(quadratic);
var cubic$1 = withDomainChecker(cubic);
var sine$1 = withDomainChecker(sine);
var exponential$1 = withDomainChecker(exponential);
var elastic$1 = withDomainChecker(elastic);
var circle$1 = withDomainChecker(circle);
var back$1 = withDomainChecker(back);

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  linear: linear$1,
  quadratic: quadratic$1,
  cubic: cubic$1,
  sine: sine$1,
  exponential: exponential$1,
  elastic: elastic$1,
  circle: circle$1,
  back: back$1
});

exports.during = during$1;
exports.easing = index;
exports.msElapsed = msElapsed$1;
exports.periodOf = periodOf$1;
exports.toggle = toggle$1;
//# sourceMappingURL=index.cjs.js.map
