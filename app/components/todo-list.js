import Ember from 'ember';
import Focusable from '../mixins/focusable';

var computed = Ember.computed;

export default Ember.Component.extend(Focusable, {
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
  showIfCompleted: computed('filter', function() {
    var filter = this.get('filter');
    return filter === 'all' || filter === 'completed';
  }),
  showIfUncompleted: computed('filter', function() {
    var filter = this.get('filter');
    return filter === 'all' || filter === 'uncompleted';
  }),
  tagName: 'ul',
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
      this.focusChild($nextEl);
    } else if ($prevEl.length) {
      this.focusChild($prevEl);
    } else {
      this.focusChild($itemEl.parent());
    }
  }
});
