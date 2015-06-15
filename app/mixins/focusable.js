import Ember from 'ember';

var FOCUSABLE_TAGS = ['a', 'button', 'input', 'option', 'select', 'textarea'];

export default Ember.Mixin.create({
  focusChild(child) {
    if (typeof child === 'string') {
      child = this.$().find(child);
    }
    focusEl(child);
  },
  focusOnRerender(selector) {
    this.one('didRender', this, () => this.focusChild(selector));
  },
  focusSelf() {
    focusEl(this.$());
  }
});

function focusEl($el) {
  var removeIndexAfterFocus = false;
  if (isDefaultFocusable($el[0]) || $el.attr('tabindex') === '0') {
    removeIndexAfterFocus = true;
  }

  $el.attr('tabindex', -1);
  $el.focus();

  if (removeIndexAfterFocus) {
    $el.removeAttr('tabindex');
  }
}

function isDefaultFocusable(el) {
  var tagName = el.tagName.toLowerCase();
  return FOCUSABLE_TAGS.indexOf(tagName) > -1;
}
