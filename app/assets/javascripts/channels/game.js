var bonus = 0;
var team_name = ""
$(document).ready(function() {  

  App.game = App.cable.subscriptions.create("GameChannel", {
    connected: function() {
      // Called when the subscription is ready for use on the server
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
    },

    received: function(data) {
      if (data.score != undefined) {
        team_name = data.team_name;
        $('.loader').css('display', 'none');
        $('.score.' + data.team_name).html(data.score);
        $('.team_score.' + data.team_name).html(data.score);
      }
      if (data.bonus) {
        bubble(data.bonus)
        bonus = data.bonus * 1;
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
    }
  });
})

$(document).on('click', '#clicker', function(e) {
  e.preventDefault();
  App.game.click();
  bubble(bonus);
  var score = parseInt($('.score').html().replace(/\s/g, ''))

  score += bonus;
  str = score.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
  str = str.substring(0, str.length - 3);

  $('.team_score.' + team_name).html(str);
  $('.score').html(str);
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