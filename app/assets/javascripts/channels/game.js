App.game = App.cable.subscriptions.create("GameChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    $('.score').html(data.score)
  },

  click: function(team_id) {
	return this.perform('click');
  }
});


$(document).on('click', '#clicker', function(e) {
  App.game.click()
})