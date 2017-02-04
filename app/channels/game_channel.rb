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
    team = Team.find(current_user.team_id)
    ModifyTeamScoreWorker.new.perform(team.id, team.click_bonus)
  end

  def level_up(data)
    template = 'team_%s'
    channel = template % [current_user.team_id]
    team = current_user.team
    team_bonus = TeamBonus.find_or_create_by(team: team,
      bonus_id: data["bonus_id"])

    score = team_bonus.level_up!

    ActionCable.server.broadcast(channel, bonus_id: team_bonus.bonus.id,
      level: team_bonus.level, score: score, price: team_bonus.price,
      click_bonus: team_bonus.click_bonus)
  end

  def level_up_auto(data)
    template = 'team_%s'
    channel = template % [current_user.team_id]
    team = current_user.team
    team_auto_clicker_bonus = TeamAutoClickerBonus.find_or_create_by(team: team,
      auto_clicker_bonus_id: data["bonus_id"])

    score = team_auto_clicker_bonus.level_up!

    ActionCable.server.broadcast(channel,
      auto_clicker_bonus_id: team_auto_clicker_bonus.auto_clicker_bonus.id,
      level: team_auto_clicker_bonus.level, score: score,
      price: team_auto_clicker_bonus.price,
      click_bonus: team_auto_clicker_bonus.click_bonus)
  end
end
