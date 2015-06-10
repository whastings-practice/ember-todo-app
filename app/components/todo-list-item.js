import Ember from 'ember';

var ITEM_CLASS = 'todo-list__item';

export default Ember.Component.extend({
  actions: {
    toggleCompleted(value, checked) {
      this.attrs['on-change'](this.get('todoId'), {completed: checked});
    }
  },
  classNames: [ITEM_CLASS],
  tagName: 'li',
  todoId: Ember.computed.alias('item.id')
});
