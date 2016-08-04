import Ember from 'ember';

const { computed, Controller, isEmpty } = Ember;

export default Controller.extend({
  selection: null,
  query: null,

  noUserSelected: computed('selection', function() {
    return isEmpty(this.get('selection'));
  }),

  actions: {
    addFriend() {
      var newFriend = this.store.createRecord('friend',
        this.get("selection").toJSON({includeId: true})
      );

      newFriend.save().then(() => {
        // This user is now our friend, so remove them from the list of friendable users
        var selectedUser = this.store.find('friendableUser', this.get('selection.id'));
        selectedUser.then((selectedUser) => {
          selectedUser.deleteRecord();
        });

        // Clear out the form
        this.set('selection', null);
        this.set('query', null);
      });
    }
  }
});
