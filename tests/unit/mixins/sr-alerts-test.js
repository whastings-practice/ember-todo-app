import Ember from 'ember';
import SrAlertsMixin from '../../../mixins/sr-alerts';
import { module, test } from 'qunit';

module('Unit | Mixin | sr alerts');

// Replace this with your real tests.
test('it works', function(assert) {
  var SrAlertsObject = Ember.Object.extend(SrAlertsMixin);
  var subject = SrAlertsObject.create();
  assert.ok(subject);
});
