'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registrable = require('./registrable');

exports.default = {
  name: 'button-group',

  mixins: [(0, _registrable.provide)('buttonGroup')],

  data: function data() {
    return {
      buttons: [],
      listeners: []
    };
  },


  methods: {
    getValue: function getValue(i) {
      if (this.buttons[i].value != null) {
        return this.buttons[i].value;
      }

      // Fix for testing, this should always be false in the browser
      if (this.buttons[i].$el.value != null && this.buttons[i].$el.value !== '') {
        return this.buttons[i].$el.value;
      }

      return i;
    },
    update: function update() {
      var selected = [];

      for (var i = 0; i < this.buttons.length; i++) {
        var elm = this.buttons[i].$el;
        var button = this.buttons[i];

        elm.removeAttribute('data-only-child');

        if (this.isSelected(i)) {
          !button.to && (button.isActive = true);
          selected.push(i);
        } else {
          !button.to && (button.isActive = false);
        }
      }

      if (selected.length === 1) {
        this.buttons[selected[0]].$el.setAttribute('data-only-child', true);
      }
    },
    register: function register(button) {
      var index = this.buttons.length;
      this.buttons.push(button);
      this.listeners.push(this.updateValue.bind(this, index));
      button.$on('click', this.listeners[index]);
    },
    unregister: function unregister(button) {
      var _this = this;

      var index = this.buttons.indexOf(button);
      if (index === -1) {
        return;
      }

      var wasSelected = this.isSelected(index);

      button.$off('click', this.listeners[index]);
      this.buttons.splice(index, 1);
      this.listeners.splice(index, 1);

      // Preserve the mandatory invariant
      if (wasSelected && this.mandatory && this.buttons.every(function (_, i) {
        return !_this.isSelected(i);
      }) && this.listeners.length > 0) {
        this.listeners[0]();
      }
    }
  },

  mounted: function mounted() {
    this.update();
  }
};