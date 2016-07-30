import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed, isPresent } = Ember;

export default Model.extend({
  bestShooting: attr('number'),
  worstShooting: attr('number'),
  number: attr('number'),
  averageStrokes: attr('number'),
  averagePar: attr('number'),
  averageScore: attr('number'),
  ranking: attr('number'),

  displayAverageStrokes: computed('averageStrokes', function() {
    if (isPresent(this.get('averageStrokes'))) {
      return Number(this.get('averageStrokes')).toFixed(3);
    } else {
      return "-";
    }
  }),

  displayAverageScore: computed('averageScore', function() {
    if (isPresent(this.get('averageScore'))) {
      return Number(this.get('averageScore')).toFixed(3);
    } else {
      return "-";
    }
  }),

  displayRanking: computed('ranking', function() {
    if (isPresent(this.get('ranking'))) {
      return this.get('ranking');
    } else {
      return "-";
    }
  }),
});
