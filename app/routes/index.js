import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createTodo(todoData) {
      var todo = this.store.createRecord('TodoItem', todoData);
      todo.save();
    }
  },
  model() {
    return this.store.find('TodoItem');
  }
});
