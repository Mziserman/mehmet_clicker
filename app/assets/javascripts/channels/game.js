//= require_tree ../


var bonus = 0;
var team_name = "a"
$(document).ready(function() {  

  App.game = App.cable.subscriptions.create("GameChannel", {
    connected: function() {
      $('.loader').css('display', 'none');
      this.get_team();
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
    },

    received: function(data) {
      if (data.score != undefined) {
        if ($('.score.' + data.team_name).html() != undefined) {
          var current = parseInt($('.score.' + data.team_name).html().replace(/\s/g, ''))
          var server = parseInt(data.score.replace(/\s/g, ''))
          console.log(current)
          console.log(server)
          console.log("__________")
          if (current < server) {
            $('.score.' + data.team_name).html(data.score);
            $('.team_score.' + data.team_name).html(data.score);
            if (data.bonus != undefined) {
              bubble(data.bonus)
              bonus = parseInt(data.bonus);
            }
          }
        }
      }
      if (data.user_team_name != undefined) {
        team_name = data.user_team_name
      }
      if (data.bonus_id != undefined) {
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.level').html(data.level)
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.price').html(data.price)
        $('.level_up_bonuses div[data-id="' + data.bonus_id + '"]')
          .find('span.click_bonus').html(data.click_bonus)

        if ($('.score.' + data.team_name).html() != undefined) {
          $('.score.' + data.team_name).html(data.score);
          $('.team_score.' + data.team_name).html(data.score)
        }
      }
      if (data.auto_clicker_bonus_id != undefined) {
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.level').html(data.level)
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.price').html(data.price)
        $('.level_up_auto_bonuses div[data-id="' + data.auto_clicker_bonus_id + '"]')
          .find('span.click_bonus').html(data.click_bonus)

        if ($('.score.' + data.team_name).html() != undefined) {
          $('.score.' + data.team_name).html(data.score)
          $('.team_score.' + data.team_name).html(data.score)
        }
      }

      if (data.completion != undefined) {
        $('.percent_completion.' + data.team_name).html("(" + data.completion + " %)")
      }
      if (data.team_name != undefined) {
        $('.indicator.' + data.team_name).css('width', data.completion + "%")
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
    },

    get_team: function() {
      return this.perform('get_team')
    },
  });
})