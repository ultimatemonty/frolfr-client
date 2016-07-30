import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Ember from "ember";

const { computed, isPresent } = Ember;

export default Model.extend({
  strokes: attr('number'),
  par: attr('number'),
  holeNumber: attr('string'),
  scorecard: belongsTo('scorecard'),

  parStatus: computed('shooting', 'isPlayed', function () {
    var shooting = this.get('shooting');

    if (0 < shooting - 1) {
      return 'multipleAbovePar';
    } else if (0 < shooting) {
      return 'abovePar';
    } else if (shooting === 0 || !this.get('isPlayed')) {
      return 'atPar';
    } else if (shooting + 1 === 0) {
      return 'belowPar';
    } else {
      return 'multipleBelowPar';
    }
  }),

  shooting: computed('strokes', 'par', function () {
    return this.get('strokes') - this.get('par');
  }),

  isPlayed: computed('strokes', function() {
    return isPresent(this.get('strokes'));
  }),

  displayStrokes: computed('isPlayed', 'strokes', function() {
    if (this.get('isPlayed')) {
      return this.get('strokes');
     } else {
      return '-';
    }
  })
});
