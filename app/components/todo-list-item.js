import Ember from 'ember';

var computed = Ember.computed;

var ITEM_CLASS = 'todo-list__item';

export default Ember.Component.extend({
  actions: {
    delete() {
      this.attrs['on-delete'](this.get('item'));
    },
    toggleCompleted(value, checked) {
      this.attrs['on-change'](this.get('todoId'), {completed: checked});
    }
  },
  classNameBindings: [
    `isMarkedCompleted:${ITEM_CLASS}--completed:${ITEM_CLASS}--uncompleted`
  ],
  classNames: [ITEM_CLASS],
  isMarkedCompleted: computed.alias('item.completed'),
  tagName: 'li',
  todoId: computed.alias('item.id')
});
