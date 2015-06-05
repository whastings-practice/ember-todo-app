import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
      'Show list',
      'Local storage',
      'Adding',
      'Completing',
      'Filtering',
      'Editing'
    ];
  }
});
