import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-todo-app/tests/helpers/start-app';

var application;

module('Acceptance | user can create todo', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('creating a todo', function(assert) {
  var todoTitle = 'Learn you some Ember!';
  assert.expect(1);

  visit('/');
  click('.todo-list-app__add-btn');
  fillIn('.todo-list__form__title-input', todoTitle);
  click('.todo-list__form button:first-of-type');

  andThen(function() {
    var $todoLi = find('.todo-list li:last-of-type');
    assert.ok($todoLi.text().indexOf(todoTitle) > -1);
  });
});
