import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed, isPresent } = Ember;

export default Model.extend({
    firstName: attr('string'),
    middleName: attr('string'),
    lastName: attr('string'),
    email: attr('string'),
    password: attr('string'),
    passwordConfirmation: attr('string'),
    avatarUrl: attr('string'),
    scorecards: hasMany('scorecard'),

    fullName: computed('firstName', 'lastName', function() {
      return this.get('firstName') + ' ' + this.get('lastName');
    }),

    hasAvatar: computed('avatarUrl', function() {
      return isPresent(this.get('avatarUrl'));
    }),

    hasValidPassword: computed('password', 'passwordConfirmation', function() {
      return this.get('password') === this.get('passwordConfirmation');
    })
});
