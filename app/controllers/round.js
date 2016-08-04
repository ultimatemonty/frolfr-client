import Ember from 'ember';

const { computed, Controller } = Ember;

export default Controller.extend({
  publicRoundUrl: computed('model.id', function () {
    return 'http://frolfr.com/public/rounds/' + this.get('model.id');
  }),

  actions: {
    makePrivate() {
      this.get('model').set('publicRecap', false);
      this.get('model').save();
    },

    publish() {
      this.get('model').set('publicRecap', true);
      this.get('model').save();
    }
  }
});
