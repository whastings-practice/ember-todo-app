import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('TodoItem');
  },

  setupController(controller, model) {
    this._super(controller, model);
    if (/todo\/[^\/]+\/?/.test(window.location.href)) {
      controller.set('isShowingTodo', true);
    }
  }
});
