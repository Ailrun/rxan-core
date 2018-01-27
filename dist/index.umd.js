(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/Observable'), require('rxjs/add/observable/defer'), require('rxjs/add/observable/interval'), require('rxjs/add/operator/map'), require('rxjs/add/operator/concat'), require('rxjs/add/operator/takeWhile')) :
	typeof define === 'function' && define.amd ? define(['exports', 'rxjs', 'rxjs/Observable', 'rxjs/add/observable/defer', 'rxjs/add/observable/interval', 'rxjs/add/operator/map', 'rxjs/add/operator/concat', 'rxjs/add/operator/takeWhile'], factory) :
	(factory((global.rxan = global.rxan || {}, global.rxan.core = {}),global.Rx,global.Rx.Observable));
}(this, (function (exports,rxjs,Observable) { 'use strict';

var SchedulerConstructor = rxjs.Scheduler.async.constructor.prototype.__proto__.constructor;
var defaultScheduler = rxjs.Scheduler.animationFrame;

var withDefaultScheduler = function withDefaultScheduler(f) {
  return function () {
    var scheduler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultScheduler;
    return f(scheduler);
  };
};

var buildSchedulerTypeError = function buildSchedulerTypeError(name) {
  var errorMessage = 'scheduler parameter for ' + name + ' is not a instance of Scheduler';

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
  return Observable.Observable.defer(function () {
    var startTime = scheduler.now();

    return Observable.Observable.interval(0, scheduler).map(function () {
      return scheduler.now() - startTime;
    });
  });
};

var msElapsed$$1 = withScheduler(msElapsed$1);

var durationTypeErrorMessage = 'second argument (duration) of during should be a number';

var during$1 = function during(scheduler) {
  return function (duration) {
    if (typeof duration !== 'number') {
      throw new TypeError(durationTypeErrorMessage);
    }

    return msElapsed$1(scheduler).map(function (ms) {
      return ms / duration;
    }).takeWhile(function (percent) {
      return percent < 1;
    }).concat([1]);
  };
};

var during$$1 = withScheduler(during$1);

var buildRangeError = function buildRangeError(name) {
  var errorMessage = "input of " + name + " should be smaller than 1, and larger than 0";

  return new RangeError(errorMessage);
};
var withDomainChecker = function withDomainChecker(f) {
  return function (x) {
    if (x < 0 || x > 1) {
      throw buildRangeError(f.name);
    }

    return f(x);
  };
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

exports.msElapsed = msElapsed$$1;
exports.during = during$$1;
exports.easing = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
