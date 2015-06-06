import Ember from 'ember';

var slice = Array.prototype.slice;

export default Ember.Component.extend({
  actions: {
    submitForm() {
      var data = ['formSubmit'].concat(slice.call(arguments));
      this.sendAction.apply(this, data);
    }
  },
  classNames: ['todo-list-app'],
  formSubmit: 'createTodo'
});
