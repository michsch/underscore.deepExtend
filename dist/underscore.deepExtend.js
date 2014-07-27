/* underscore.deepExtend - v0.1.4 - 2014-07-27
 * https://github.com/michsch/underscore.deepExtend
 * original: https://gist.github.com/echong/3861963
 * Copyright (c) 2014 Elliot Chong, Michael Schulze (AMD wrapper);
 * Licensed MIT license & WTFPL
 */
(function(root, factory) {
  'use strict';
  if (typeof root._ === 'function' && typeof exports === 'object') {
    module.exports = factory(root._);
  } else if (typeof define === 'function' && define.amd) {
    define(['underscore'], factory);
  } else if (typeof root._ === 'function') {
    factory(root._);
  }
})((typeof window === 'object' && window) || this, function(_) {
  'use strict';
  var arrays, basicObjects, deepClone, deepExtend, deepExtendCouple, exports, isBasicObject, mixins;
  exports = exports || {};
  _ = _ || window._;
  if (!(typeof _ === 'function' || typeof _ === 'object')) {
    throw new Error('Underscore not loaded!');
  }

  /*
   * Create a deep copy of an object.
   * Based on https://github.com/documentcloud/underscore/pull/595
   *
   * @method deepClone
   * @param {Object} obj
   * @returns {Object}
   */
  deepClone = function(obj) {
    var func, isArr;
    if (!_.isObject(obj) || _.isFunction(obj)) {
      return obj;
    }
    if (_.isDate(obj)) {
      return new Date(obj.getTime());
    }
    if (_.isRegExp(obj)) {
      return new RegExp(obj.source, obj.toString().replace(/.*\//, ''));
    }
    isArr = _.isArray(obj || _.isArguments(obj));
    func = function(memo, value, key) {
      if (isArr) {
        memo.push(deepClone(value));
      } else {
        memo[key] = deepClone(value);
      }
      return memo;
    };
    return _.reduce(obj, func, isArr ? [] : {});
  };

  /*
   * Is a given value a basic Object? i.e.: {} || new Object()
   *
   * @method isBasicObject
   * @param {Object} object
   * @returns {Boolean} true if is a basic object, false if not
   */
  isBasicObject = function(object) {
    return (object.prototype === {}.prototype || object.prototype === Object.prototype) && _.isObject(object) && !_.isArray(object) && !_.isFunction(object) && !_.isDate(object) && !_.isRegExp(object) && !_.isArguments(object);
  };

  /*
   * Returns a list of the names of every object in an object — that is to say,
   * the name of every property of the object that is an object.
   *
   * @method basicObjects
   * @param {Object} object
   * @returns {Object}
   */
  basicObjects = function(object) {
    return _.filter(_.keys(object), function(key) {
      return isBasicObject(object[key]);
    });
  };

  /*
   * Returns a list of the names of every array in an object — that is to say,
   * the name of every property of the object that is an array.
   *
   * @method arrays
   * @param {Object} object
   * @returns {Object}
   */
  arrays = function(object) {
    return _.filter(_.keys(object), function(key) {
      return _.isArray(object[key]);
    });
  };

  /*
   * Copy and combine all of the properties in the source objects over to the
   * destination object and return the destination object. This method will
   * recursively copy shared properties which are also objects and combine arrays.
   *
   * @method deepExtendCouple
   * @param {Object} destination
   * @param {Object} source
   * @param {Number} maxDepth
   * @returns {Object}
   */
  deepExtendCouple = function(destination, source, maxDepth) {
    var combine, recurse, sharedArrayKey, sharedArrayKeys, sharedObjectKey, sharedObjectKeys, _i, _j, _len, _len1;
    if (maxDepth === void 0) {
      maxDepth = 20;
    }
    if (maxDepth <= 0) {
      console.warn('_.deepExtend(): Maximum depth of recursion hit.');
      return _.extend(destination, source);
    }
    sharedObjectKeys = _.intersection(basicObjects(destination), basicObjects(source));
    recurse = function(key) {
      return source[key] = deepExtendCouple(destination[key], source[key], maxDepth - 1);
    };
    for (_i = 0, _len = sharedObjectKeys.length; _i < _len; _i++) {
      sharedObjectKey = sharedObjectKeys[_i];
      recurse(sharedObjectKey);
    }
    sharedArrayKeys = _.intersection(arrays(destination), arrays(source));
    combine = function(key) {
      return source[key] = _.union(destination[key], source[key]);
    };
    for (_j = 0, _len1 = sharedArrayKeys.length; _j < _len1; _j++) {
      sharedArrayKey = sharedArrayKeys[_j];
      combine(sharedArrayKey);
    }
    return _.extend(destination, source);
  };

  /*
   * Copy and combine all of the properties in the supplied objects from right to
   * left and return the combined object. This method will recursively copy
   * shared properties which are also objects and combine arrays.
   *
   * @method deepExtend
   * @param {Object} objects (multiple objects)
   * @param {Number} maxDepth
   * @returns {Object}
   */
  deepExtend = function() {
    var finalObj, maxDepth, objects, _i;
    if (2 <= arguments.length) {
      objects = [].slice.call(arguments, 0, _i = arguments.length - 1);
    } else {
      _i = 0;
      objects = [];
    }
    maxDepth = arguments[_i++];
    if (!_.isNumber(maxDepth)) {
      objects.push(maxDepth);
      maxDepth = 20;
    }
    if (objects.length <= 1) {
      return objects[0];
    }
    if (maxDepth <= 0) {
      return _.extend.apply(this, objects);
    }
    finalObj = objects.shift();
    while (objects.length > 0) {
      finalObj = deepExtendCouple(finalObj, deepClone(objects.shift()), maxDepth);
    }
    return finalObj;
  };
  mixins = {
    deepClone: deepClone,
    isBasicObject: isBasicObject,
    basicObjects: basicObjects,
    arrays: arrays,
    deepExtend: deepExtend
  };
  if (typeof _.mixin === "function") {
    _.mixin(mixins);
  }
  return _;
});
