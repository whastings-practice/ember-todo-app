import $ from 'jquery';
import Ember from 'ember';

var FOCUSABLE_TAGS = ['a', 'button', 'input', 'option', 'select', 'textarea'];

var run = Ember.run;

export default Ember.Mixin.create({
  displayAlertMessage(message) {
    var $alertEl = $('#sr-alert');

    if (!$alertEl.length) {
      throw new Error('Screen reader alert element (#sr-alert) is missing.');
    }

    $alertEl.text(message);
  },

  focus(child) {
    if (!child) {
      return focusEl(this.$());
    }

    if (typeof child === 'string') {
      child = this.$().find(child);
    }

    focusEl(child);
  },

  focusAfterRender(child) {
    if (!child) {
      child = this.$();
    } else if (typeof child === 'string') {
      child = this.$().find(child);
    }

    run.scheduleOnce('afterRender', null, focusEl.bind(child));
  }
});

function focusEl($el) {
  var origTabIndex = $el.attr('tabindex');

  $el.attr('tabindex', -1);
  $el.focus();

  if (isDefaultFocusable($el[0])) {
    $el.removeAttr('tabindex');
  } else if (origTabIndex === '0') {
    $el.attr('tabindex', 0);
  }
}

function isDefaultFocusable(el) {
  var tagName = el.tagName.toLowerCase();
  return FOCUSABLE_TAGS.indexOf(tagName) > -1;
}
