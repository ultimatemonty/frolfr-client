import Ember from 'ember';

const { computed, Controller } = Ember;

export default Controller.extend({
  columnWidth: computed('scorecards.length', function() {
    var scorecardColumns = this.get('scorecards.length');
    var scorecardColumnPercentage = 100 / scorecardColumns;

    return 'width: ' + scorecardColumnPercentage + '%;';
  }),

  holeNumbers: computed('scorecards.firstObject.turns.length', function() {
    var turnsCount = this.get('scorecards.firstObject.turns.length');
    var holeNumbers = new Array(turnsCount)
      .join().split(',')
      .map(function(item, index){ return ++index; });

    return holeNumbers;
  })
});
