import Ember from 'ember';

Ember.Component.reopen({
  focusManager: Ember.inject.service(),
  focusNode: null,

  focus(child = this.get('focusNode')) {
    this.get('focusManager').focusComponent(this, child);
  },

  focusAfterRender(child = this.get('focusNode')) {
    this.get('focusManager').focusComponentAfterRender(this, child);
  }
});
