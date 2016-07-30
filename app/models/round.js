import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  courseName: attr('string'),
  createdAt: attr('date'),
  scorecards: hasMany('scorecard'),
  course: belongsTo('course'),
  holeCount: attr('string'),
  publicRecap: attr('boolean'),

  // only used for creating new rounds
  players: hasMany('friend'),

  isStarted: computed('scorecar@each.isStarted', function() {
    return this.get('scorecards').any(function (scorecard) {
      return scorecard.get('isStarted');
    });
  })
});
