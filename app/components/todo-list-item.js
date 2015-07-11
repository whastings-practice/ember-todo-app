import Ember from 'ember';

var computed = Ember.computed;

var ITEM_CLASS = 'todo-list__item';

export default Ember.Component.extend({
  attributeBindings: ['aria-hidden', 'aria-labelledby', 'data-id', 'tabindex'],
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

  a11yTitle: computed('item.title', function() {
    var item = this.get('item');
    return `Todo item ${item.get('title')}`;
  }),

  'aria-hidden': computed('isMarkedCompleted', function() {
    return !this.attrs['should-show'](this.get('item'));
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

  'data-id': computed('item.id', function() {
    var item = this.get('item');
    return `todo-item-${item.get('id')}`;
  }),

  titleId: computed('item.id', function() {
    var item = this.get('item');
    return `todo-${item.get('id')}-title`;
  })
});
