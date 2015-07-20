import $ from 'jquery';
import Ember from 'ember';

var run = Ember.run;

export default Ember.Service.extend({
  _nextMessage: null,

  displayAlertMessage(message) {
    this.set('_nextMessage', message);
    run.scheduleOnce('afterRender', this, '_afterRenderCallback');
  },

  _afterRenderCallback() {
    var $alertEl = $('#sr-alert'),
        message = this.get('_nextMessage');

    if ($alertEl.length && message) {
      $alertEl.text(message);
      this.set('_nextMessage', null);
    }
  }
});
