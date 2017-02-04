class GameChannel < ApplicationCable::Channel
  def subscribed
    template = 'team_%s'
    channel = template % [current_user.team_id]
    stream_from channel
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def click(data)
    team = Team.find(data["team_id"])
    ModifyTeamScoreWorker.new.perform(team.id, team.click_bonus)
  end

  def level_up(data)
    template = 'team_%s'
    channel = template % [current_user.team_id]
    team = Team.find(data["team_id"])
    team_bonus = TeamBonus.find_or_create_by(team: team,
      bonus_id: data["bonus_id"])

    score = team_bonus.level_up!

    ActionCable.server.broadcast(channel, bonus_id: team_bonus.bonus.id,
      level: team_bonus.level, score: render_number(score),
      price: render_number(team_bonus.price),
      click_bonus: render_number(team_bonus.click_bonus), team_id: team.id)
  end

  def level_up_auto(data)
    template = 'team_%s'
    channel = template % [current_user.team_id]
    team = Team.find(data["team_id"])
    team_auto_clicker_bonus = TeamAutoClickerBonus.find_or_create_by(team: team,
      auto_clicker_bonus_id: data["bonus_id"])

    score = team_auto_clicker_bonus.level_up!

    ActionCable.server.broadcast(channel,
      auto_clicker_bonus_id: team_auto_clicker_bonus.auto_clicker_bonus.id,
      level: team_auto_clicker_bonus.level, score: render_number(score),
      price: render_number(team_auto_clicker_bonus.price),
      click_bonus: render_number(team_auto_clicker_bonus.click_bonus),
      team_id: team.id)
  end


  def render_number(number)
    ApplicationController.render(
      partial: 'game/number',
      locals: {
        number: number,
      })
  end
end
