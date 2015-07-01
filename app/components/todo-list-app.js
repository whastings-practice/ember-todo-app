import Ember from 'ember';
import Focusable from '../mixins/focusable';

var computed = Ember.computed;

var APP_CLASS = 'todo-list-app',
    ADD_BTN_CLASS = `${APP_CLASS}__add-btn`;

export default Ember.Component.extend(Focusable, {
  classNames: ['todo-list-app'],
  isAdding: false,
  todoFilter: 'uncompleted',

  actions: {
    filterTodos(newFilter) {
      this.set('todoFilter', newFilter);
    },

    hideAddForm() {
      this.set('isAdding', false);
      this.focusAfterRender(`.${ADD_BTN_CLASS}`);
    },

    showAddForm() {
      this.set('isAdding', true);
    },

    submitForm(data) {
      // TODO: Wait for save to store to complete.
      this.displayAlertMessage(`Added todo item ${data.title}.`);
      this.set('isAdding', false);
      this.attrs['on-add'](data);
      this.focusOnRerender(`.${ADD_BTN_CLASS}`);
    }
  },

  didInsertElement() {
    this.focus('h1');
  },

  emptyMessage: computed('todoFilter', function() {
    var filter = this.get('todoFilter'),
        adjective = (filter === 'all') ? '' : filter;

    return `No ${adjective} todo items...`;
  }),

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
  })
});
