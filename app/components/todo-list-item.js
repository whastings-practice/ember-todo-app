import Ember from 'ember';

var computed = Ember.computed;

var ITEM_CLASS = 'todo-list__item';

export default Ember.Component.extend({
  actions: {
    delete() {
      this.attrs['on-delete'](this);
    },
    toggleCompleted(value, checked) {
      this.attrs['on-change'](this, {completed: checked});
    }
  },
  'aria-hidden': computed('isMarkedCompleted', function() {
    var isMarkedCompleted = this.get('isMarkedCompleted'),
        showIfCompleted = this.attrs['show-if-completed'].value,
        showIfUncompleted = this.attrs['show-if-uncompleted'].value;

    return (isMarkedCompleted && !showIfCompleted) ||
      (!isMarkedCompleted && !showIfUncompleted);
  }),
  'aria-labelledby': computed('titleId', function() {
    return this.get('titleId');
  }),
  attributeBindings: ['aria-hidden', 'aria-labelledby', 'tabindex'],
  classNameBindings: [
    `isMarkedCompleted:${ITEM_CLASS}--completed:${ITEM_CLASS}--uncompleted`
  ],
  classNames: [ITEM_CLASS],
  completeLabel: computed('item.completed', 'item.title', function() {
    var item = this.get('item'),
        completed = item.get('completed'),
        title = item.get('title'),
        action = completed ? 'Mark uncompleted' : 'Mark completed';

    return `${action} todo item ${title}`;
  }),
  isMarkedCompleted: computed.alias('item.completed'),
  tabindex: 0,
  tagName: 'li',
  titleId: computed('item.id', function() {
    var item = this.get('item');
    return `todo-${item.get('id')}-title`;
  }),
  todoId: computed.alias('item.id')
});
