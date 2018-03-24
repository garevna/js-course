'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// From Vue, slightly modified

function noop() {}

if (typeof console === 'undefined') {
  window.console = {
    warn: noop,
    error: noop
  };
}

// avoid info messages during test
console.info = noop;

var asserted = [];

function createCompareFn(spy) {
  var hasWarned = function hasWarned(msg) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = spy.calls.allArgs()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var args = _step.value;

        if (args.some(function (arg) {
          return arg.toString().includes(msg);
        })) return true;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  };

  return {
    compare: function compare(msg) {
      asserted.push(msg);
      var warned = Array.isArray(msg) ? msg.some(hasWarned) : hasWarned(msg);
      return {
        pass: warned,
        message: warned ? function () {
          return 'Expected message "' + msg + '" not to have been warned';
        } : function () {
          return 'Expected message "' + msg + '" to have been warned';
        }
      };
    }
  };
}

function toHaveBeenWarnedInit() {
  // define custom matcher for warnings
  beforeEach(function () {
    asserted.length = 0;
    spyOn(console, 'warn');
    spyOn(console, 'error');
    jasmine.addMatchers({
      toHaveBeenWarned: function toHaveBeenWarned() {
        return createCompareFn(console.error);
      },
      toHaveBeenTipped: function toHaveBeenTipped() {
        return createCompareFn(console.warn);
      }
    });
  });

  afterEach(function (done) {
    var _arr = ['error', 'warn'];

    for (var _i = 0; _i < _arr.length; _i++) {
      var type = _arr[_i];
      var warned = function warned(msg) {
        return asserted.some(function (assertedMsg) {
          return msg.toString().includes(assertedMsg);
        });
      };
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = console[type].calls.allArgs()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var args = _step2.value;

          if (!warned(args[0])) {
            done.fail('Unexpected console.' + type + ' message: ' + args[0]);
            return;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    done();
  });
}

exports.default = toHaveBeenWarnedInit;