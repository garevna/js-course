'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeWindow = undefined;
exports.test = test;
exports.functionalContext = functionalContext;
exports.rafPolyfill = rafPolyfill;
exports.touch = touch;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _avoriaz = require('avoriaz');

var _toHaveBeenWarned = require('@util/to-have-been-warned');

var _toHaveBeenWarned2 = _interopRequireDefault(_toHaveBeenWarned);

var _Vuetify = require('@components/Vuetify');

var _Vuetify2 = _interopRequireDefault(_Vuetify);

var _vueTemplateCompiler = require('vue-template-compiler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(name, cb) {
  (0, _toHaveBeenWarned2.default)();

  _Vuetify2.default.install(_vue2.default);

  /*
    const app = document.createElement('div')
    app.setAttribute('data-app', true)
    document.body.appendChild(app)
  */

  rafPolyfill(window);

  // Very naive polyfill for performance.now()
  window.performance = { now: function now() {
      return new Date().getTime();
    } };

  describe(name, function () {
    return cb({
      functionalContext: functionalContext,
      mount: _avoriaz.mount,
      shallow: _avoriaz.shallow,
      compileToFunctions: _vueTemplateCompiler.compileToFunctions
    });
  });
}

test.skip = describe.skip;

function functionalContext() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!Array.isArray(children)) children = [children];
  return {
    context: Object.assign({
      data: {},
      props: {}
    }, context),
    children: children
  };
}

//requestAnimationFrame polyfill | Milos Djakonovic ( @Miloshio ) | MIT | https://github.com/milosdjakonovic/requestAnimationFrame-polyfill
function rafPolyfill(w) {
  /**
   *
   * How many times should polyfill call
   * update callback? By canon, it should
   * be 60 times per second, so that ideal
   * framerate 60fps could be reached.
   *
   * However, even native implementations
   * of requestAnimationFrame often cannot
   * do 60fps, but, unlike any polyfill,
   * they can synchronise achievable fps
   * rate with screen refresh rate.
   *
   * So, leave this value 1000/60 unless
   * you target specific browser on spec
   * ific device that is going to work
   * better with custom value. I think
   * that this is the longest comment I've
   * written on single variable so far.
  **/
  var FRAME_RATE_INTERVAL = 1000 / 60,


  /**
   * All queued callbacks in given cycle.
  **/
  allCallbacks = [],
      executeAllScheduled = false,
      shouldCheckCancelRaf = false,


  /**
   * Callbacks queued for cancellation.
  **/
  callbacksForCancellation = [],


  /**
   * Should callback be cancelled?
   * @param cb - callback
  **/
  isToBeCancelled = function isToBeCancelled(cb) {
    for (var i = 0; i < callbacksForCancellation.length; i++) {
      if (callbacksForCancellation[i] === cb) {
        callbacksForCancellation.splice(i, 1);
        return true;
      }
    }
  },


  /**
   *
   * Executes all (surprise) callbacks in
   * and removes them from callback queue.
   *
  **/
  executeAll = function executeAll() {
    executeAllScheduled = false;
    var _allCallbacks = allCallbacks;
    allCallbacks = [];
    for (var i = 0; i < _allCallbacks.length; i++) {
      if (shouldCheckCancelRaf === true) {
        if (isToBeCancelled(_allCallbacks[i])) {
          shouldCheckCancelRaf = false;
          return;
        }
      }
      _allCallbacks[i].apply(w, [new Date().getTime()]);
    }
  },


  /**
   *
   * requestAnimationFrame polyfill
   * @param callback - callback to be queued & executed | executed
   * @return callback
   *
  **/
  raf = function raf(callback) {
    allCallbacks.push(callback);
    if (executeAllScheduled === false) {
      w.setTimeout(executeAll, FRAME_RATE_INTERVAL);
      executeAllScheduled = true;
    }
    return callback;
  },


  /**
   *
   * Cancels raf.
  **/
  cancelRaf = function cancelRaf(callback) {
    callbacksForCancellation.push(callback);
    shouldCheckCancelRaf = true;
  },


  //https://gist.github.com/paulirish/1579671
  vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !w.requestAnimationFrame; ++x) {
    w.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame'];
    w.cancelAnimationFrame = w[vendors[x] + 'CancelAnimationFrame'] || w[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!w.requestAnimationFrame) w.requestAnimationFrame = raf;
  if (!w.cancelAnimationFrame) w.cancelAnimationFrame = cancelRaf;
}

function touch(element) {
  var createTrigger = function createTrigger(eventName) {
    return function (clientX, clientY) {
      var touches = [{ clientX: clientX, clientY: clientY }];
      element.trigger(eventName, { touches: touches, changedTouches: touches });
      return touch(element);
    };
  };

  return {
    start: createTrigger('touchstart'),
    move: createTrigger('touchmove'),
    end: createTrigger('touchend')
  };
}

var resizeWindow = exports.resizeWindow = function resizeWindow() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global.innerWidth;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global.innerHeight;

  global.innerWidth = width;
  global.innerHeight = height;
  global.dispatchEvent(new Event('resize'));
  return new Promise(function (resolve) {
    return setTimeout(resolve, 200);
  });
};