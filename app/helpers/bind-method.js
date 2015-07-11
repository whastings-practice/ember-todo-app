import Ember from 'ember';

export function bindMethod(params/*, hash*/) {
  var [ method, target, ...args ] = params;
  return target[method].bind(target, ...args);
}

export default Ember.Helper.helper(bindMethod);
