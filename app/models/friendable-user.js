import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed, isPresent } = Ember;

export default Model.extend({
  firstName: attr('string'),
  middleName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  avatarUrl: attr('string'),

  fullName: computed('firstName', 'lastName', function() {
    const firstName = this.get('firstName');
    const lastName = this.get('lastName');
    return `${firstName} ${lastName}`;
  }),

  hasAvatar: computed('avaarUrl', function() {
    return isPresent(this.get('avatarUrl'));
  })
});
