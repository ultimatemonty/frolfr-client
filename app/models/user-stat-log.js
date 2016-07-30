import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  firstName: attr('string'),
  totalScorecardsPlayed: attr('number'),
  completedScorecardsPlayed: attr('number'),
  coursesPlayed: attr('number'),
  totalRoundsWithUser: attr('number'),
  totalRoundsWon: attr('number'),
  totalRoundsLost: attr('number'),
  totalRoundsTied: attr('number'),
  totalIncompleteRounds: attr('number'),

  hasNeverPlayed: computed('totalScorecardsPlayed', function() {
    return this.get('totalScorecardsPlayed') === 0;
  })
});
