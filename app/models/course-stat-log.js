import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  totalScorecardsPlayed: attr('number'),
  completedScorecardsPlayed: attr('number'),
  averageStrokes: attr('number'),
  bestStrokes: attr('number'),
  averageScore: attr('number'),
  bestScore: attr('number'),
  totalBogeys: attr('number'),
  totalPars: attr('number'),
  totalBirdies: attr('number'),
  totalEagles: attr('number'),
  totalDoublesOrWorse: attr('number'),

  displayAverageStrokes: computed('averageStrokes', function() {
    return Number(this.get('averageStrokes')).toFixed(3);
  }),

  displayAverageScore: computed('averageScore', function() {
    return Number(this.get('averageScore')).toFixed(3);
  }),
});
