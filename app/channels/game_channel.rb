class GameChannel < ApplicationCable::Channel
  def subscribed
    template = 'team_%s'
    channel = template % [current_user.team_id]
    puts channel
    stream_from channel
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  def click(data)
    template = 'team_%s'
    channel = template % [current_user.team_id]
    team = Team.find(current_user.team_id)
    team.score += 1
    team.save
    ActionCable.server.broadcast(channel, score: team.score)
  end
end
