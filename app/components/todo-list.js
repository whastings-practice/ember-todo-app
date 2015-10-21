import Ember from 'ember';
import FocusableComponent from 'ember-component-focus/mixins/focusable-component';

var computed = Ember.computed;

export default Ember.Component.extend(FocusableComponent, {
  attributeBindings: ['aria-label', 'tabindex'],
  classNameBindings: ['filterClass'],
  classNames: ['todo-list'],
  tagName: 'ul',

  actions: {
    deleteItem(itemComponent) {
      var todo = itemComponent.get('item');

      this._moveItemFocus(itemComponent);

      this.attrs['on-item-delete'](todo);
    },

    updateItem(itemComponent, props) {
      if (this.get('filter') !== 'all') {
        this._moveItemFocus(itemComponent);
      }

      this.attrs['on-item-change'](itemComponent.get('item'), props);
    }
  },

  'aria-label': computed('filter', function() {
    var currentFilter = this.get('filter');
    return `${currentFilter} todo items`;
  }),

  didReceiveAttrs(attrs) {
    var {newAttrs, oldAttrs} = attrs,
        newFilter = newAttrs.filter.value;

    if (oldAttrs && (oldAttrs.filter.value !== newFilter)) {
      this.focusAfterRender();
    }
  },

  filterClass: computed('filter', function() {
    var currentFilter = this.get('filter');
    return `todo-list--${currentFilter}`;
  }),

  shouldShow(item) {
    var filter = this.get('filter'),
        itemCompleted = item.get('completed');

    return (filter === 'all') ||
      (filter === 'completed' && itemCompleted) ||
      (filter === 'uncompleted' && !itemCompleted);
  },

  visibleItemClass: computed('filter', function() {
    var currentFilter = this.get('filter');
    return currentFilter === 'all' ? 'todo-list__item' :
      `todo-list__item--${currentFilter}`;
  }),

  _moveItemFocus(itemComponent) {
    var itemClass = `.${this.get('visibleItemClass')}`,
        $itemEl = itemComponent.$(),
        $nextEl = $itemEl.next(itemClass),
        $prevEl = $itemEl.prev(itemClass);

    if ($nextEl.length) {
      this.focus($nextEl);
    } else if ($prevEl.length) {
      this.focus($prevEl);
    } else {
      this.focus($itemEl.parent());
    }
  }
});
