import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var run = Ember.run;
var ItemStub = Ember.Object.extend({
  completed: false,
  id: 'xyz',
  title: 'FooBar'
});

var item,
    methods,
    shouldShowValue;

moduleForComponent('todo-list-item', 'Integration | Component | todo list item', {
  integration: true,

  beforeEach() {
    item = ItemStub.create();
    this.set('item', item);

    shouldShowValue = true;
    methods = {
      shouldShowStub() {
        return shouldShowValue;
      }
    };
    this.set('methods', methods);

    this.getComponentEl = function() {
      return this.$().children().first();
    };

    this.renderDefault = function() {
      this.render(hbs`{{todo-list-item item=item should-show=(bind-method 'shouldShowStub' methods)}}`);
    };
  }
});

test('it renders an <li> with attributes based on item', function(assert) {
  var $componentEl;
  assert.expect(3);

  this.renderDefault();
  $componentEl = this.getComponentEl();

  assert.equal($componentEl.prop('tagName'), 'LI');
  assert.equal($componentEl.attr('data-id'), 'todo-item-xyz');
  assert.equal($componentEl.attr('aria-labelledby'), 'todo-xyz-title');
});

test('it sets a modifier class based on its item\'s completed state', function(assert) {
  var $componentEl;
  assert.expect(2);

  this.renderDefault();
  $componentEl = this.getComponentEl();

  assert.ok($componentEl.hasClass('todo-list__item--uncompleted'));

  run(() => item.set('completed', true));
  assert.ok($componentEl.hasClass('todo-list__item--completed'));
});

test('it sets aria-hidden based on value returned from should-show attr', function(assert) {
  var $componentEl;
  assert.expect(2);

  this.renderDefault();
  $componentEl = this.getComponentEl();

  assert.ok($componentEl.attr('aria-hidden'), 'false');

  shouldShowValue = false;
  run(() => item.set('completed', true)); // Trigger rerender.
  assert.ok($componentEl.attr('aria-hidden'), 'true');
});
