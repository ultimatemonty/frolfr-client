import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  password: attr('string'),
  passwordConfirmation: attr('string'),
  passwordResetToken: attr('string'),
  email: attr('string')
});
