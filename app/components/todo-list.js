import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
  classNameBindings: ['filterClass'],
  classNames: ['todo-list'],
  filterClass: computed('filter', function() {
    var currentFilter = this.get('filter');
    return `todo-list--${currentFilter}`;
  }),
  tagName: 'ul'
});
