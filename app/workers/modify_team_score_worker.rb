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
      bonus: 1 + increment, completion: rounded_percent_completion,
      team_name: t.name)
    Team.find_each do |team|
      template = 'team_%s'
      channel = template % [team.id]
      ActionCable.server.broadcast(channel, completion: rounded_percent_completion,
        score: render_number(t.score), team_name: t.name)
    end
    ActionCable.server.broadcast("team_", completion: rounded_percent_completion,
      score: render_number(t.score), team_name: t.name)
  end

  def render_number(number)
    ApplicationController.render(
      partial: 'game/number',
      locals: {
        number: number,
      })
  end
end
