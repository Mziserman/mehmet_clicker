class ModifyTeamScoreWorker
  include Sidekiq::Worker

  def perform(team_id, increment)
    t = Team.find(team_id)
    t.update!(score: t.score + 1 + increment)

    template = 'team_%s'
    channel = template % [team_id]

    percent_completion = ((t.score / Goal.first.score)
      .to_f < 1 ? (t.score / Goal.first.score).to_f * 100 : 100)
    rounded_percent_completion = ('%.2f' % percent_completion).to_s.reverse
      .gsub(/(\d{3})(?=\d)/, '\\1 ').reverse

    ActionCable.server.broadcast(channel, score: render_number(t.score),
      bonus: 1 + increment, completion: rounded_percent_completion)
  end

  def render_number(number)
    ApplicationController.render(
      partial: 'game/number',
      locals: {
        number: number,
      })
  end
end
