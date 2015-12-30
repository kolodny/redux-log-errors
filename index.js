'use strict';

var xtends = Object.assign || function (target, source) {
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  return target;
};

exports['default'] = function (createStore) {
  return function (reducer, initialState) {
    var store = createStore(reducer, initialState);
    var cachedDispatch = store.dispatch;

    return xtends({}, store, {
      dispatch: function dispatch() {
        try {
          return cachedDispatch.apply(undefined, arguments);
        } catch (error) {
          console.error('an error occurred while dispatching', { error: error });
        }
      }
    });
  };
};

module.exports = exports['default'];