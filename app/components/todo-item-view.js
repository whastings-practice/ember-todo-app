import Ember from 'ember';

var run = Ember.run;

export default Ember.Component.extend({
  classNames: ['todo-item-view'],
  classNameBindings: ['isHidden:todo-item-view--hidden'],
  isHidden: true,

  actions: {
    close() {
      this.attrs['on-close']();
      this.set('isHidden', true);
    }
  },

  didInsertElement() {
    run.next(this, function() {
      this.set('isHidden', false);
    });
  }
});
