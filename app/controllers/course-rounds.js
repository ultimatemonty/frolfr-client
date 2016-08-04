import Ember from 'ember';

const { computed, Controller } = Ember;

export default Controller.extend({
  // Pagination
  page: 1,
  perPage: 10,

  hasRatings() {
    return this.get('filteredContent').any(function(scorecard) {
      return Ember.isPresent(scorecard.get('rating'));
    });
  }.property('filteredContent.@each.rating'),

  pagedContent() {
    var start = (this.get('page') - 1) * this.get('perPage');
    var end = this.get('page') * this.get('perPage');

    return this.get('filteredContent').slice(start, end);
  }.property('filteredContent.@each', 'page', 'perPage'),

  isPaginated() {
    return this.get('filteredContent').length > this.get('perPage');
  }.property('filteredContent.length', 'perPage'),

  isFirstPage() {
    return this.get('page') === 1;
  }.property('page'),

  totalPages() {
    return Math.ceil(this.get('filteredContent').length / this.get('perPage'));
  }.property('page', 'perPage', 'filteredContent.length'),

  isLastPage() {
    return this.get('page') === this.get('totalPages');
  }.property('page', 'totalPages'),

  // Filtering
  includeIncompleteScorecards: false,

  resetPageCount() {
    this.set('page', 1);
  }.observes('includeIncompleteScorecards'),

  filteredContent() {
    if (this.get('includeIncompleteScorecards')) {
      return this.get('arrangedContent');
    } else {
      return this.get('completedScorecards');
    }
  }.property('arrangedContent.@each', 'includeIncompleteScorecards', 'completedScorecards.@each'),

  completedScorecards() {
    return this.get('arrangedContent').filter(function(scorecard) {
      return scorecard.get('isCompleted');
    });
  }.property('arrangedContent.@each.isCompleted'),

  allScorecardsCompleted() {
    return this.get('arrangedContent').every(function(scorecard) {
      return scorecard.get('isCompleted');
    });
  }.property('arrangedContent.@each.isCompleted'),

  // Sorting
  sortProperties: ['createdAt'],
  sortAscending: false,

  currentSortProperty: computed('sortProperties', function() {
    return this.get('sortProperties').get('0');
  }),

  sortCreatedAt: computed('currentSortProperty', 'sortDirection', function() {
    return this.isSortedBy('createdAt');
  }),

  sortTotalStrokes: computed('currentSortProperty', 'sortDirection', function() {
    return this.isSortedBy('totalStrokes');
  }),

  sortTotalScore: computed('currentSortProperty', 'sortDirection', function() {
    return this.isSortedBy('totalScore');
  }),

  isSortedBy(property) {
    if (this.get('currentSortProperty') === property) {
      return this.get('sortDirection');
    } else {
      return '';
    }
  },

  sortDirection: computed('sortAscending', function() {
    if (this.get('sortAscending')) {
      return 'fa fa-arrow-up';
    } else {
      return 'fa fa-arrow-down';
    }
  }),

  actions: {
    sortBy(property) {
      var isAscending = !this.get('sortAscending');

      this.set('sortProperties', [property]);
      this.set('sortAscending', isAscending);
      this.set('page', 1);
    },

    nextPage() {
      this.incrementProperty('page');
    },

    previousPage() {
      this.decrementProperty('page');
    },

    deleteRound(round) {
      if (window.confirm('Are you sure you want to delete this round?')) {
        round.then(function(round) {
          round.get('scorecards').map(function(scorecard) {
            scorecard.deleteRecord();
          });
          round.destroyRecord();
        });
      }
    }
  }
});
