import Ember from 'ember';
import config from 'frolfr-client/config/environment';

const { Controller, observer } = Ember;

export default Controller.extend({
  needs: ['currentUser'],

  init() {
    this._super();
    if (Ember.$.cookie('token') && Ember.$.cookie('email')) {
      this.setupAuthHeader(Ember.$.cookie('token'), Ember.$.cookie('email'));
      this.setupCurrentUser();
    }
  },

  attemptedTransition: null,
  token: Ember.$.cookie('token'),
  email: Ember.$.cookie('email'),

  reset() {
    this.setProperties({
      email: null,
      password: null,
      token: null
    });
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Token none'
      }
    });
  },

  tokenChanged: observer('token', function() {
    if (Ember.isEmpty(this.get('token'))) {
      Ember.$.removeCookie('token');
      Ember.$.removeCookie('email');
    } else {
      var twentyYears = 365 * 20;
      Ember.$.cookie('token', this.get('token'), { expires: twentyYears });
      Ember.$.cookie('email', this.get('email'), { expires: twentyYears });
    }

  }),

  actions: {
    login() {
      var _this = this;

      var attemptedTransition = this.get('attemptedTransition');
      var data = this.getProperties('email', 'password');

      // clear form fields
      this.setProperties({email: null, password: null});

      Ember.$.post(config.apiHost + '/api/authorizations', data).then(function(response) {
        _this.setupAuthHeader(response.token, data.email);

        _this.setProperties({
          token: response.token,
          email: data.email
        });

        _this.setupCurrentUser();

        _this.store.find('round', 'current').then(function(round) {
          _this.controllerFor('application').set('currentRound', round);

          var nextUnplayedHole = round.get('scorecards.firstObject.nextUnplayedTurn.holeNumber');
          _this.controllerFor('application').set('currentHole', nextUnplayedHole);
        }, function() {
          // Do nothing if there is no current round
        });

        if (attemptedTransition) {
          attemptedTransition.retry();
          _this.set('attemptedTransition', null);
        } else {
          _this.transitionToRoute('index');
        }

      }, function(error) {
        if (error.status === 422) {
          alert("Invalid password. Please try again.");
        }
      });
    },
    loginWithCredentials(email, password) {
      this.set('email', email);
      this.set('password', password);
      this.send('login');
    },
  },

  // private
  setupAuthHeader(token, email) {
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Token token="' + token + '",email="' + email + '"'
      }
    });
  },

  setupCurrentUser() {
    var _this = this;
    this.store.find('user', 'current').then(function(user) {
      _this.get('controllers.currentUser').set('model', user);
    });
  }
});
