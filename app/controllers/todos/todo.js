import Ember from 'ember';

export default Ember.Controller.extend({
  eventBus: Ember.inject.service(),

  actions: {
    onTodoClose() {
      this.get('eventBus').trigger('todo_close');
    }
  }
});
