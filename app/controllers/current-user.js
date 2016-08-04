import Ember from 'ember';

const { computed, Controller } = Ember;

export default Controller.extend({
  isAuthenticated: computed('model.isLoaded', function() {
    return this.get('model.isLoaded');
  })
});
