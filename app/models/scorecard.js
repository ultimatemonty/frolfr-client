import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;
const { alias } = Ember;

export default Model.extend({
  round: belongsTo('round'),
  courseName: attr('string'),
  courseId: attr('number'),
  createdAt: attr('date'),
  user: belongsTo('user'),
  userInitials: attr('string'),
  turns: hasMany('turn'),

  userFullName: alias('user.fullName'),
  hasUserAvatar: alias('user.hasAvatar'),
  userAvatarUrl: alias('user.avatarUrl'),

  isStarted: computed('turns.@each.isPlayed', function() {
    return this.get('turns').any(function (turn) {
      return turn.get('isPlayed');
    });
  }),

  isAllTurnsPlayed: computed('turns.@each.isPlayed', function() {
    return this.get('turns').every(function (turn) {
      return turn.get('isPlayed');
    });
  }),

  isFinished: computed('isMoreThanOneDayOld', 'isAllTurnsPlayed', function() {
    return this.get('isMoreThanOneDayOld') || this.get('isAllTurnsPlayed');
  }),

  isMoreThanOneDayOld: computed('createdAt', function() {
    var today = new Date().getTime(),
        datePlayed = new Date(this.get('createdAt')).getTime(),
        oneDayInMilliseconds = 86400000;

    return (today - datePlayed) > oneDayInMilliseconds;
  }),

  playedTurns: computed('turns.@each.isPlayed', function() {
    return this.get('turns').filter(function (turn) {
      return turn.get('isPlayed');
    });
  }),

  nextUnplayedTurn: function() {
    return this.get('turns').find(function (turn) {
      return !turn.get('isPlayed');
    });
  }.property('turns.@each.isPlayed'),

  totalStrokes: computed('turns.@each.isPlayed', function () {
    return this.get('playedTurns').reduce(function (acc, turn) {
      return acc + turn.get('strokes');
    }, 0);
  }),

  totalPar: computed('playedTurns.@each.par', function () {
    return this.get('playedTurns').reduce(function (acc, turn) {
      return acc + turn.get('par');
    }, 0);
  }),

  totalScore: computed('totalStrokes', 'totalPar', function () {
    return this.get('totalStrokes') - this.get('totalPar');
  }),

  formattedTotals: computed('totalStrokes', 'formattedShooting', function () {
    var totalStrokes = this.get('totalStrokes'),
        formattedShooting = this.get('formattedShooting');

    return totalStrokes + ' (' + formattedShooting + ')';
  }),

  formattedShooting: computed('totalStrokes', 'totalPar', 'totalScore', function () {
    var totalStrokes = this.get('totalStrokes'),
        totalPar   = this.get('totalPar'),
        totalScore = this.get('totalScore'),
        sign = '';

    if (totalPar < totalStrokes) {
      sign = "+";
    } else if (totalScore === 0) {
      totalScore = "Even";
    }

    return sign + totalScore;
  })
});
