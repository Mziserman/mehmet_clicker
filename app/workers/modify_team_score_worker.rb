class ModifyTeamScoreWorker
  include Sidekiq::Worker

  def perform(team_id, increment)
    t = Team.find(team_id)
    t.update!(score: t.score + 1 + increment)

    template = 'team_%s'
    channel = template % [team_id]

    ActionCable.server.broadcast(channel, score: render_number(t.score))
  end

  def render_number(number)
    ApplicationController.render(
      partial: 'game/number',
      locals: {
        number: number,
      })
  end
end
