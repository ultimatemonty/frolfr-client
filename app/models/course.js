import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed, isPresent } = Ember;

export default Model.extend({
  city: attr('string'),
  state: attr('string'),
  country: attr('string'),
  name: attr('string'),
  status: attr('string'),
  location: attr('string'),
  lastPlayedAt: attr('date'),
  holeCount: attr('number'),
  scorecards: hasMany('scorecard'),
  holes: hasMany('hole'),
  reviews: hasMany('review'), 
  photos: hasMany('photo'),

  isApproved: computed('status', function() {
    return this.get('status') === 'approved';
  }),

  hasPhoto: computed('photos', function() {
    return isPresent(this.get('photos'));
  })
});
