import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteTodo(todo) {
      this.sendAction('todoDeleteAction', todo);
    },
    filterTodos(newFilter) {
      this.set('todoFilter', newFilter);
    },
    hideAddForm() {
      this.set('isAdding', false);
    },
    showAddForm() {
      this.set('isAdding', true);
    },
    submitForm(data) {
      this.set('isAdding', false);
      this.sendAction('formSubmitAction', data);
    },
    updateTodo(id, data) {
      this.sendAction('todoUpdateAction', id, data);
    }
  },
  classNames: ['todo-list-app'],
  formSubmitAction: 'createTodo',
  isAdding: false,
  todoDeleteAction: 'deleteTodo',
  todoFilter: 'uncompleted',
  todoUpdateAction: 'updateTodo'
});
