import Ember from 'ember';
import Focusable from '../mixins/focusable';

var APP_CLASS = 'todo-list-app',
    ADD_BTN_CLASS = `${APP_CLASS}__add-btn`;

export default Ember.Component.extend(Focusable, {
  actions: {
    deleteTodo(todo) {
      this.sendAction('todoDeleteAction', todo);
    },
    filterTodos(newFilter) {
      this.set('todoFilter', newFilter);
    },
    hideAddForm() {
      this.set('isAdding', false);
      this.one('didRender', this, () => this.focusChild(`.${ADD_BTN_CLASS}`));
    },
    showAddForm() {
      this.set('isAdding', true);
    },
    submitForm(data) {
      this.set('isAdding', false);
      this.sendAction('formSubmitAction', data);
      this.one('didRender', this, () => this.focusChild(`.${ADD_BTN_CLASS}`));
    },
    updateTodo(id, data) {
      this.sendAction('todoUpdateAction', id, data);
    }
  },
  classNames: ['todo-list-app'],
  didInsertElement() {
    this.focusChild('h2');
  },
  formSubmitAction: 'createTodo',
  isAdding: false,
  todoDeleteAction: 'deleteTodo',
  todoFilter: 'uncompleted',
  todoUpdateAction: 'updateTodo'
});
