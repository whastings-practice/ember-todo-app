import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeFilter(newFilter) {
      this.set('currentFilter', newFilter);
      this.attrs['on-change'](newFilter.toLowerCase());
    }
  },
  currentFilter: 'Uncompleted',
  links: ['Uncompleted', 'All', 'Completed']
});
