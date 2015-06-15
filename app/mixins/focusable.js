import Ember from 'ember';

export default Ember.Mixin.create({
  focusChild(child) {
    if (typeof child === 'string') {
      child = this.$().find(child);
    }
    focusEl(child);
  },
  focusSelf() {
    focusEl(this.$());
  }
});

function focusEl($el) {
  if ($el.attr('tabindex') !== '0') {
    $el.attr('tabindex', -1);
  }
  $el.focus();
}
