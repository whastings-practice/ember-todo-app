import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  title: attr('string'),
  notes: attr('string'),
  completed: attr('boolean', {defaultValue: false})
});
