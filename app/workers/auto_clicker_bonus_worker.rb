class AutoClickerBonusWorker
  include Sidekiq::Worker


  def perform(*args)
    Team.find_each do |t|
      score_bonus = 0
      t.team_auto_clicker_bonuses.each do |tacb|
        score_bonus += tacb.click_bonus
      end

      t.with_lock do
        t.score += score_bonus
        t.save!
      end

      template = 'team_%s'
      channel = template % [t.id]
      completion = find_completion(t)

      ActionCable.server.broadcast(channel, score: render_number(t.score),
        bonus: score_bonus, completion: completion,
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
