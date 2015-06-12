import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    filterTodos(newFilter) {
      this.set('todoFilter', newFilter);
    },
    submitForm(data) {
      this.sendAction('formSubmitAction', data);
    },
    updateTodo(id, data) {
      this.sendAction('todoUpdateAction', id, data);
    }
  },
  classNames: ['todo-list-app'],
  formSubmitAction: 'createTodo',
  todoFilter: 'uncompleted',
  todoUpdateAction: 'updateTodo'
});
