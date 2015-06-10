import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitForm(data) {
      this.sendAction('formSubmitAction', data);
    },
    updateTodo(id, data) {
      this.sendAction('todoUpdateAction', id, data);
    }
  },
  classNames: ['todo-list-app'],
  formSubmitAction: 'createTodo',
  todoUpdateAction: 'updateTodo'
});
