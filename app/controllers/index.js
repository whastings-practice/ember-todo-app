import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteTodo(todo) {
      todo.deleteRecord();
      return todo.save();
    },

    createTodo(todoData) {
      var todo = this.store.createRecord('TodoItem', todoData);
      return todo.save();
    },

    updateTodo(todo, todoData) {
      Object.keys(todoData).forEach(prop => todo.set(prop, todoData[prop]));
      return todo.save();
    }
  }
});
