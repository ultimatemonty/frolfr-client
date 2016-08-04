import Ember from 'ember';

const { computed, Controller } = Ember;
const { alias, equal } = computed;

export default Controller.extend({
  holeNumber: alias('model.firstObject.holeNumber'),
  holePar: alias('model.firstObject.par'),
  isFirstHole: equal('holeNumber', '1'),
  isLastHole: equal('holeNumber', 'holeCount'),
  isPar3: equal('holePar', 3),
  isPar4: equal('holePar', 4),
  isPar5: equal('holePar', 5),

  finishRound() {
    var roundId = this.get('roundId');

    this.controllerFor('application').set('currentRound', null);
    this.controllerFor('application').set('currentHole', null);
    this.transitionToRoute('round', roundId);
  },

  actions: {
    previousHole() {
      var holeNumber = parseInt(this.get('holeNumber')) - 1,
          roundId = this.get('roundId');

      this.send('saveAll');
      this.controllerFor('application').set('currentHole', holeNumber);

      Ember.$("html, body").animate({ scrollTop: 0 });
      this.transitionToRoute('turns', roundId, holeNumber);
    },

    nextHole() {
      var holeNumber = parseInt(this.get('holeNumber')) + 1,
          roundId = this.get('roundId'),
          _this = this;

      this.send('saveAll');
      this.controllerFor('application').set('currentHole', holeNumber);

      Ember.$("html, body").animate({ scrollTop: 0 });
      if (this.get('isLastHole')) {
        _this.finishRound();
      } else {
        _this.transitionToRoute('turns', roundId, holeNumber);
      }
    },

    addOne(turn) {
      var strokes = parseInt(turn.get('strokes') || 0),
          maximumTurnStrokes = 8;

      turn.set('strokes', Math.min(maximumTurnStrokes, strokes + 1));
    },

    subtractOne(turn) {
      var strokes = parseInt(turn.get('strokes') || 0),
          minimumTurnStrokes = 1,
          newStrokes = strokes - 1;

      if (newStrokes < minimumTurnStrokes) {
        turn.set('strokes', null);
      } else {
        turn.set('strokes', newStrokes);
      }
    },

    changePar(par) {
      var changedPar = parseInt(par);

      this.get('model').forEach(function(turn) {
        turn.set('par', changedPar);
      });
    },

    // Private
    saveAll() {
      this.get('model').forEach(function(turn) {
        if (turn.get('isDirty')) {
          turn.save();
        }
      });
    }
  }
});
