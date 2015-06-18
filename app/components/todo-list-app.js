import Ember from 'ember';
import Focusable from '../mixins/focusable';

var computed = Ember.computed;

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
      this.focusOnRerender(`.${ADD_BTN_CLASS}`);
    },
    showAddForm() {
      this.set('isAdding', true);
    },
    submitForm(data) {
      this.set('isAdding', false);
      this.sendAction('formSubmitAction', data);
      this.focusOnRerender(`.${ADD_BTN_CLASS}`);
    },
    updateTodo(id, data) {
      this.sendAction('todoUpdateAction', id, data);
    }
  },
  classNames: ['todo-list-app'],
  didInsertElement() {
    this.focusChild('h1');
  },
  emptyMessage: computed('todoFilter', function() {
    var filter = this.get('todoFilter'),
        adjective = (filter === 'all') ? '' : filter;

    return `No ${adjective} todo items...`;
  }),
  formSubmitAction: 'createTodo',
  isAdding: false,
  listTabIndex: computed('todosAreVisible', function() {
    return this.get('todosAreVisible') ? -1 : 0;
  }),
  todosAreVisible: computed('todoFilter', 'todos.@each.completed', function() {
    var filter = this.get('todoFilter'),
        todos = this.get('todos'),
        isShowingCompleted;

    if (filter === 'all') {
      return !!todos.get('length');
    }

    isShowingCompleted = filter === 'completed';
    return !!todos.filter(todo => todo.get('completed') === isShowingCompleted).length;
  }),
  todoDeleteAction: 'deleteTodo',
  todoFilter: 'uncompleted',
  todoUpdateAction: 'updateTodo'
});
