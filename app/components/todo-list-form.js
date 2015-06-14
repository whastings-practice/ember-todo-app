import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    cancel() {
      this.attrs['on-cancel']();
    }
  },
  submit(event) {
    var todoData = {title: this.get('title')};
    event.preventDefault();
    this.attrs['on-submit'](todoData);
    this.set('title', '');
  },
  classNames: ['todo-list__form'],
  tagName: 'form',
  title: ''
});
