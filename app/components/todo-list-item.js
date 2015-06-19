import Ember from 'ember';
import Focusable from '../mixins/focusable';

var computed = Ember.computed;

var ITEM_CLASS = 'todo-list__item';

export default Ember.Component.extend(Focusable, {
  attributeBindings: ['aria-hidden', 'aria-labelledby', 'tabindex'],
  classNameBindings: [
    `isMarkedCompleted:${ITEM_CLASS}--completed:${ITEM_CLASS}--uncompleted`
  ],
  classNames: [ITEM_CLASS],
  isMarkedCompleted: computed.alias('item.completed'),
  tabindex: 0,
  tagName: 'li',
  todoId: computed.alias('item.id'),

  actions: {
    delete() {
      var item = this.get('item'),
          title = item.get('title');

      this.attrs['on-delete'](this);

      // TODO: Wait for save to store to complete.
      this.displayAlertMessage(`Deleted todo item ${title}`);
    },

    toggleCompleted(value, checked) {
      var item = this.get('item'),
          completedDesc = checked ? 'completed' : 'uncompleted',
          title = item.get('title');

      this.attrs['on-change'](this, {completed: checked});

      // TODO: Wait for save to store to complete.
      this.displayAlertMessage(`Marked ${completedDesc} todo item ${title}`);
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

  completeLabel: computed('item.completed', 'item.title', function() {
    var item = this.get('item'),
        completed = item.get('completed'),
        title = item.get('title'),
        action = completed ? 'Mark uncompleted' : 'Mark completed';

    return `${action} todo item ${title}`;
  }),

  titleId: computed('item.id', function() {
    var item = this.get('item');
    return `todo-${item.get('id')}-title`;
  })
});
