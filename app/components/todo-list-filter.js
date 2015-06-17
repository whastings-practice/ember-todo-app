import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeFilter(newFilter) {
      this.set('currentFilter', newFilter);
      this.attrs['on-change'](newFilter.toLowerCase());
    }
  },
  'aria-label': 'Todo item filters',
  attributeBindings: ['aria-label', 'role'],
  classNames: ['todo-list-filter'],
  currentFilter: 'Uncompleted',
  links: ['Uncompleted', 'All', 'Completed'],
  role: 'menu'
});
