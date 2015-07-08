import $ from 'jquery';
import Ember from 'ember';

export default Ember.Mixin.create({
  focusManager: Ember.inject.service(),

  displayAlertMessage(message) {
    var $alertEl = $('#sr-alert');

    if (!$alertEl.length) {
      throw new Error('Screen reader alert element (#sr-alert) is missing.');
    }

    $alertEl.text(message);
  },

  focus(child) {
    this.get('focusManager').focusComponent(this, child);
  },

  focusAfterRender(child) {
    this.get('focusManager').focusComponentAfterRender(this, child);
  },

  focusWithAlert(alertMessage, child) {
    this.get('focusManager').focusComponentAfterRender(this, child)
      .then(this.displayAlertMessage.bind(this, alertMessage))
      .catch(console.log.bind(console));
  }
});
