import $ from 'jquery';
import Ember from 'ember';

Ember.Component.reopen({
  focusManager: Ember.inject.service(),
  focusNode: null,

  displayAlertMessage(message) {
    var $alertEl = $('#sr-alert');

    if (!$alertEl.length) {
      throw new Error('Screen reader alert element (#sr-alert) is missing.');
    }

    $alertEl.text(message);
  },

  focus(child) {
    child = child || this.get('focusNode');
    this.get('focusManager').focusComponent(this, child);
  },

  focusAfterRender(child) {
    child = child || this.get('focusNode');
    this.get('focusManager').focusComponentAfterRender(this, child);
  },

  focusWithAlert(alertMessage, child) {
    child = child || this.get('focusNode');
    this.get('focusManager').focusComponentAfterRender(this, child)
      .then(this.displayAlertMessage.bind(this, alertMessage))
      .catch(console.log.bind(console));
  }
});
