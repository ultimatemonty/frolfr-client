import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;
const { alias } = computed;

export default Model.extend({
  rating: attr('number'),
  canUpdate: attr('boolean'),
  post: attr('string'),
  course: belongsTo('course'),
  user: belongsTo('user'),
  createdAt: attr('date'),

  userFullName: alias('user.fullName')
});
