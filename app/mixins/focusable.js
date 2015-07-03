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
    child = findChild(this, child);
    focusEl(child);
  },

  focusAfterRender(child) {
    run.scheduleOnce('afterRender', null, this.focus.bind(this, child));
  },

  focusWithAlert(alertMessage, child) {
    run.scheduleOnce('afterRender', null, () => {
      this.focus(child);
      this.displayAlertMessage(alertMessage);
    });
  }
});

function findChild(component, child) {
  if (!child) {
    return component.$();
  }
  if (typeof child === 'string') {
    return component.$().find(child);
  }
  return child;
}

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
