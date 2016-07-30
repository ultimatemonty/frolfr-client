import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Ember from 'ember';

const { computed, isPresent } = Ember;

export default Model.extend({
  createdAt: attr('date'),
  totalStrokes: attr('number'),
  totalScore: attr('number'),
  isCompleted: attr('boolean'),
  rating: attr('number'),
  round: belongsTo('round'),
  roundId: attr('number'),

  displayRating: computed('rating', function() {
    if (isPresent(this.get('rating'))) {
      return this.get('rating');
    } else {
      return "N/A";
    }
  }),

  formattedTotalScore: computed('totalScore', 'isCompleted', function() {
    var shooting = this.get('totalScore'),
        isCompleted = this.get('isCompleted');

    if (shooting > 0) {
      shooting = "+" + shooting;
    } else if (shooting === 0) {
      shooting = "Even";
    }

    if (!isCompleted) {
      shooting = shooting + "*";
    }

    return shooting;
  })
});
