import Ember from 'ember';
import Focusable from '../mixins/focusable';

var computed = Ember.computed;

export default Ember.Component.extend(Focusable, {
  actions: {
    deleteItem(itemComponent) {
      var todo = itemComponent.get('item'),
          itemClass = `.${this.get('visibleItemClass')}`,
          $itemEl = itemComponent.$(),
          $nextEl = $itemEl.next(itemClass),
          $prevEl = $itemEl.prev(itemClass);

      if ($nextEl.length) {
        this.focusChild($nextEl);
      } else if ($prevEl.length) {
        this.focusChild($prevEl);
      } else {
        this.focusChild($itemEl.parent());
      }

      this.attrs['on-item-delete'](todo);
    }
  },
  'aria-label': computed('filter', function() {
    var currentFilter = this.get('filter');
    return `${currentFilter} todo items`;
  }),
  attributeBindings: ['aria-label'],
  didReceiveAttrs(attrs) {
    var {newAttrs, oldAttrs} = attrs,
        newFilter = newAttrs.filter.value;

    if (oldAttrs && (oldAttrs.filter.value !== newFilter)) {
      this.focusSelfOnRerender();
    }
  },
  classNameBindings: ['filterClass'],
  classNames: ['todo-list'],
  filterClass: computed('filter', function() {
    var currentFilter = this.get('filter');
    return `todo-list--${currentFilter}`;
  }),
  tagName: 'ul',
  visibleItemClass: computed('filter', function() {
    var currentFilter = this.get('filter');
    return `todo-list__item--${currentFilter}`;
  })
});
