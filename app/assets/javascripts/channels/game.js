App.game = App.cable.subscriptions.create("GameChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
  	console.log(data)
    $('.score').html(data.score)
  },

  click: function(team_id) {
	return this.perform('click', {team_id: team_id});
  }
});


$(document).on('click', '#clicker', function(e) {
  var team_id = 1;
  App.game.click(team_id)
  console.log('oui')
})