import Ember from 'ember';

export default Ember.Mixin.create({
  srAlertManager: Ember.inject.service(),

  displayAlertMessage(message) {
    this.get('srAlertManager').displayAlertMessage(message);
  },

  focusWithAlert(alertMessage, child = this.get('focusNode')) {
    this.get('componentFocusManager').focusComponentAfterRender(this, child)
      .then(this.displayAlertMessage.bind(this, alertMessage))
      .catch(console.log.bind(console));
  }
});
