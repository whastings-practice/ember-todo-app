import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
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
  todoFilter: 'uncompleted',
  todoUpdateAction: 'updateTodo'
});
