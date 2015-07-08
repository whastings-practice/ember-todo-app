import Ember from 'ember';

var run = Ember.run,
    RSVP = Ember.RSVP;

var FOCUSABLE_TAGS = ['a', 'button', 'input', 'option', 'select', 'textarea'];

export default Ember.Service.extend({
  _afterRenderResolver: null,
  _afterRenderPromise: null,
  _lastFocusedEl: null,
  _nextToFocus: null,

  focusComponent(component, child) {
    var $el = findElToFocus(component, child),
        origTabIndex = $el.attr('tabindex');

    this._resetLastFocusedEl();

    if (origTabIndex !== '0' && !isDefaultFocusable($el)) {
      $el.attr('tabindex', -1);
      this.set('_lastFocusedEl', {$el, origTabIndex});
    }

    $el.focus();
    return $el;
  },

  focusComponentAfterRender(component, child) {
    var afterRenderPromise = this.get('_afterRenderPromise');

    this.set('_nextToFocus', {component, child});

    if (!afterRenderPromise) {
      afterRenderPromise = new RSVP.Promise(resolve => {
        this.set('_afterRenderResolver', resolve);
      });
      this.set('_afterRenderPromise', afterRenderPromise);
    }

    run.scheduleOnce('afterRender', this, '_afterRenderCallback');
    return afterRenderPromise;
  },

  _afterRenderCallback() {
    var resolver = this.get('_afterRenderResolver'),
        {component, child} = this.get('_nextToFocus');

    var focusedEl = this.focusComponent(component, child);

    this.set('_nextToFocus', null);
    this.set('_afterRenderPromise', null);
    this.set('_afterRenderResolver', null);

    if (typeof resolver === 'function') {
      resolver(focusedEl);
    }
  },

  _resetLastFocusedEl() {
    var lastFocusedEl = this.get('_lastFocusedEl');

    if (!lastFocusedEl) {
      return;
    }

    var { $el, origTabIndex } = lastFocusedEl;

    if (origTabIndex === undefined) {
      $el.removeAttr('tabindex');
    } else {
      $el.attr('tabindex', origTabIndex);
    }

    this.set('_lastFocusedEl', null);
  }
});

function findElToFocus(component, child) {
  if (!child) {
    return component.$();
  }
  if (typeof child === 'string') {
    return component.$().find(child);
  }
  return child;
}

function isDefaultFocusable($el) {
  var tagName = $el.get(0).tagName.toLowerCase();
  return FOCUSABLE_TAGS.indexOf(tagName) > -1;
}
