import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
const { computed, Controller } = Ember;

export default Controller.extend({
  pagedContent: pagedArray('model', {infinite: true}),

  hasNextPage: computed('content.page', 'content.totalPages', function() {
    return this.get('model.totalPages') > this.get('model.page');
  }),

  actions: {
    loadNext() {
      this.get('pagedContent').loadNextPage();
    }
  }
});
