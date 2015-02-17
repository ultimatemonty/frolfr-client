import Ember from 'ember';
import User from '/app/models/user';

var UsersNewController = Ember.Controller.extend({
  needs: "sessions",

  actions: {
    createUser: function() {
      var self = this;
      var fields = this.get('fields');

      if (User.validPassword(fields)) {
        var user = this.store.createRecord('user', fields);

        user.save().then(function(user) {
          var email = user.get('email');
          var password = self.get('fields').password;

          self.get('controllers.sessions').send("loginWithCredentials", email, password);
        });
      } else {
        this.set('showPasswordError', true)
      }
    }
  }
});

export default UsersNewController;