import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  coursesPlayed: attr('number'),
  scorecardsStarted: attr('number'),
  completedScorecards: attr('number'),
  statesPlayed: attr('number'),
  topPlayedCourseName: attr('string'),
  topPlayedCourseScorecardsStarted: attr('number'),
  topFriendName: attr('string'),
  topFriendRoundsCount: attr('number'),

  hasNeverPlayed: computed('scorecardsStarted', function() {
    return this.get('scorecardsStarted') === 0;
  }),

  displayTopPlayedCourse: computed('topPlayedCourseName', 'topPlayedCourseScorecardsStarted', function() {
    return this.get('topPlayedCourseName') + ' (' + this.get('topPlayedCourseScorecardsStarted') + ' rounds)';
  }),

  displayTopFriend: computed('topFriendName', 'topFriendRoundsCount', function() {
    return this.get('topFriendName') + ' (' + this.get('topFriendRoundsCount') + ' rounds)';
  })
});
