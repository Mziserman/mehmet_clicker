App.game = App.cable.subscriptions.create("GameChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    if (data.score != undefined) {
      $('.score').html(data.score)
    }
    if (data.team_bonus_id != undefined) {
      $('span.level[data-id="' + data.team_bonus_id + '"]').html(data.level)
      $('span.price[data-id="' + data.team_bonus_id + '"]').html(data.price)
    }
  },

  click: function(team_id) {
    return this.perform('click');
  },

  level_up: function(team_bonus_id) {
    console.log(team_bonus_id)
    return this.perform('level_up', {team_bonus_id: team_bonus_id})
  }
});


$(document).on('click', '#clicker', function(e) {
  App.game.click()
})

$(document).on('click', '.level_up a', function(e) {
  team_bonus_id = $(e.target).data("id")
  App.game.level_up(team_bonus_id)
  e.preventDefault()
})