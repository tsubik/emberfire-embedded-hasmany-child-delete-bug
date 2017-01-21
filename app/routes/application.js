import Ember from "ember";

const { RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll("event").then((events) => events.get("firstObject"));
  },

  actions: {
    resetDatabase() {
      this.store.findAll("event").then((events) => {
        return RSVP.all(events.invoke("destroyRecord"));
      }).then(() => {
        const users = [
          this.store.createRecord("user", { name: "Tomasz" }),
          this.store.createRecord("user", { name: "Magda" }),
          this.store.createRecord("user", { name: "Maciej" }),
        ];
        const expenses = [
          this.store.createRecord("expense", {
            name: "Test expense",
            participants: users
          })
        ];
        const event = this.store.createRecord("event", {
          name: "New Test event",
          users,
          expenses
        });
        event.save().then(() => this.refresh());
      });
    },

    remove(expense, participant) {
      expense.get("participants").removeObject(participant);
      expense.save();
    }
  }
});
