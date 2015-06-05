import Ember from 'ember';

var ITEM_CLASS = 'todo-list__item';

export default Ember.Component.extend({
  classNames: [ITEM_CLASS],
  tagName: 'li'
});
