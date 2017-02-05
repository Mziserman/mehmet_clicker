$(document).ready(function() {  
  App.game = App.cable.subscriptions.create("GameChannel", {
    connected: function() {
      // Called when the subscription is ready for use on the server
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
    },

    received: function(data) {
      // console.log(data)
      if (data.score != undefined) {
        $('.loader').css('display', 'none')
        $('.score').html(data.score)
        bubble(data.bonus)
      }
      if (data.bonus_id != undefined) {
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.level').html(data.level)
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.price').html(data.price)
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.click_bonus').html(data.click_bonus)
      }
      if (data.auto_clicker_bonus_id != undefined) {
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.level').html(data.level)
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.price').html(data.price)
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.click_bonus').html(data.click_bonus)
      }
    },

    click: function(team_id) {
      return this.perform('click');
    },

    level_up: function(bonus_id) {
      return this.perform('level_up', {bonus_id: bonus_id})
    },

    level_up_auto: function(bonus_id) {
      return this.perform('level_up_auto', {bonus_id: bonus_id})
    }
  });
})

$(document).on('click', '#clicker', function(e) {
  e.preventDefault();
  App.game.click()
})

$(document).on('click', '.level_up_bonuses a', function(e) {
  bonus_id = $(e.target).parents('div').data("id")
  App.game.level_up(bonus_id)
  e.preventDefault()
})

$(document).on('click', '.level_up_auto_bonuses a', function(e) {
  bonus_id = $(e.target).parents('div').data("id")
  App.game.level_up_auto(bonus_id)
  e.preventDefault()
})