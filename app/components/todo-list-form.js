import Ember from 'ember';
import Focusable from '../mixins/focusable';

var FORM_CLASS = 'todo-list__form';

export default Ember.Component.extend(Focusable, {
  actions: {
    cancel() {
      this.attrs['on-cancel']();
    }
  },
  didInsertElement() {
    this.focusChild(`.${FORM_CLASS}__title-input`);
  },
  submit(event) {
    var todoData = {title: this.get('title')};
    event.preventDefault();
    this.attrs['on-submit'](todoData);
    this.set('title', '');
  },
  classNames: [FORM_CLASS],
  tagName: 'form',
  title: ''
});
