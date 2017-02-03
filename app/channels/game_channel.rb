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
    template = 'team_%s'
    channel = template % [current_user.team_id]
    team = Team.find(current_user.team_id)
    team.score += 1 + team.click_bonus
    if team.save
      ActionCable.server.broadcast(channel, score: team.score)
    end
  end

  def level_up(data)
    puts data["team_bonus_id"]
    template = 'team_%s'
    channel = template % [current_user.team_id]
    team = Team.find(current_user.team_id)
    team_bonus = team.team_bonuses.find(data["team_bonus_id"])
    team_bonus.level_up!
    ActionCable.server.broadcast(channel, team_bonus_id: team_bonus.id,
      level: team_bonus.level, score: team.score, price: team_bonus.price)
  end
end
