import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('todo-item-view', 'Integration | Component | todo item view', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{todo-item-view}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#todo-item-view}}
      template block text
    {{/todo-item-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
