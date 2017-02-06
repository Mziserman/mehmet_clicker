class ModifyTeamScoreWorker
  include Sidekiq::Worker

  def perform(team_id, increment)
    t = Team.find(team_id)
    t.with_lock do
      t.score += 1 + increment
      t.save!
    end
    # t.update!(score: t.score + 1 + increment)

    template = 'team_%s'
    channel = template % [team_id]

    completion = find_completion(t)

    ActionCable.server.broadcast(channel, score: render_number(t.score),
      bonus: 1 + increment, completion: completion,
      team_name: t.name)
    Team.find_each do |team|
      template = 'team_%s'
      channel = template % [team.id]
      ActionCable.server.broadcast(channel, completion: completion,
        score: render_number(t.score), team_name: t.name)
    end
    ActionCable.server.broadcast("team_", completion: completion,
      score: render_number(t.score), team_name: t.name)
  end

  def find_completion(team)
    percent_completion = ((team.score / team.goal.score)
      .to_f < 1 ? (team.score / team.goal.score).to_f * 100 : 100)
    ('%.2f' % percent_completion).to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1 ').reverse
  end

  def render_number(number)
    ApplicationController.render(
      partial: 'game/number',
      locals: {
        number: number,
      })
  end
end
