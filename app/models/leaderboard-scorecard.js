import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  createdAt: attr('date'),
  userFullName: attr('string'),
  totalStrokes: attr('number'),
  totalScore: attr('number'),

  formattedTotalScore: computed('totalScore', function() {
    var shooting = this.get('totalScore');

    if (shooting > 0) {
      shooting = "+" + shooting;
    } else if (shooting === 0) {
      shooting = "Even";
    }

    return shooting;
  })
});
