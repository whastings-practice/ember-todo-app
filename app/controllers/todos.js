import Ember from 'ember';

var run = Ember.run;

export default Ember.Controller.extend({
  eventBus: Ember.inject.service(),
  isShowingTodo: false,

  actions: {
    deleteTodo(todo) {
      todo.deleteRecord();
      return todo.save();
    },

    createTodo(todoData) {
      var todo = this.store.createRecord('TodoItem', todoData);
      return todo.save();
    },

    openTodo(item) {
      if (this.get('isShowingTodo')) {
        this.transitionToRoute('todos.todo', item);
      } else {
        run.later(this, function() {
          this.transitionToRoute('todos.todo', item);
        }, 705);
      }
      this.set('isShowingTodo', true);
    },

    updateTodo(todo, todoData) {
      Object.keys(todoData).forEach(prop => todo.set(prop, todoData[prop]));
      return todo.save();
    }
  },

  closeTodo() {
    run.later(this, function() {
      this.transitionToRoute('todos');
    }, 605);
    this.set('isShowingTodo', false);
  },

  init() {
    this.get('eventBus').on('todo_close', this.closeTodo.bind(this));
  }
});
