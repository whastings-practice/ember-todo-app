import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createTodo(todoData) {
      var todo = this.store.createRecord('TodoItem', todoData);
      return todo.save();
    },
    deleteTodo(todo) {
      todo.deleteRecord();
      return todo.save();
    },
    updateTodo(id, todoData) {
      return this.store.find('TodoItem', id)
        .then(function(todo) {
          Object.keys(todoData).forEach(prop => todo.set(prop, todoData[prop]));
          return todo.save();
        });
    }
  },
  model() {
    return this.store.find('TodoItem');
  }
});
