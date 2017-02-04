class ModifyTeamScoreWorker
  include Sidekiq::Worker

  def perform(team_id, increment)
    t = Team.find(team_id)
    t.update!(score: t.score + increment)

    template = 'team_%s'
    channel = template % [team_id]

    ActionCable.server.broadcast(channel, score: t.score)
  end
end
