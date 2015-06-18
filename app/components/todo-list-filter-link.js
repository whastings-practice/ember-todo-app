import Ember from 'ember';

var computed = Ember.computed;

var LINK_CLASS = 'todo-filter__link';

export default Ember.Component.extend({
  'aria-checked': computed.alias('isSelected'),
  attributeBindings: ['aria-checked', 'href', 'role'],
  classNames: [LINK_CLASS],
  classNameBindings: [`isSelected:${LINK_CLASS}--selected`],
  href: '#',
  role: 'menuitemradio',
  tagName: 'a',

  click(event) {
    event.preventDefault();
    this.sendAction('action', this.get('text'));
  },

  isSelected: computed('selectedLink', 'text', function() {
    return this.get('text') === this.get('selectedLink');
  }),

  keyDown(event) {
    if (event.keyCode === 32) {
      this.sendAction('action', this.get('text'));
    }
  }
});
