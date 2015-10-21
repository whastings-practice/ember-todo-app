import Ember from 'ember';
import FocusableComponent from 'ember-component-focus/mixins/focusable-component';

var FORM_CLASS = 'todo-list__form';

export default Ember.Component.extend(FocusableComponent, {
  classNames: [FORM_CLASS],
  notes: '',
  tagName: 'form',
  title: '',

  actions: {
    cancel() {
      this.attrs['on-cancel']();
    }
  },

  didInsertElement() {
    this.focus(`.${FORM_CLASS}__title-input`);
  },

  submit(event) {
    var todoData = {title: this.get('title'), notes: this.get('notes')};
    event.preventDefault();
    this.attrs['on-submit'](todoData);
    this.set('title', '');
    this.set('notes', '');
  }
});
