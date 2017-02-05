class AutoClickerBonusWorker
  include Sidekiq::Worker

  def perform(*args)
    Team.find_each do |t|
      score_bonus = 0
      t.team_auto_clicker_bonuses.each do |tacb|
        score_bonus += tacb.click_bonus
      end
      t.update!(score: t.score + score_bonus)
      percent_completion = ((t.score / Goal.first.score)
        .to_f < 1 ? (t.score / Goal.first.score).to_f * 100 : 100)
      rounded_percent_completion = ('%.2f' % percent_completion).to_s.reverse
        .gsub(/(\d{3})(?=\d)/, '\\1 ').reverse
      template = 'team_%s'
      channel = template % [t.id]

      ActionCable.server.broadcast(channel, score: render_number(t.score),
        bonus: score_bonus, completion: rounded_percent_completion,
        team_name: t.name, user_team_name: current_user.team_name)

      Team.find_each do |team|
        template = 'team_%s'
        channel = template % [team.id]
        ActionCable.server.broadcast(channel, completion: rounded_percent_completion,
          score: render_number(t.score), team_name: t.name)
      end
      ActionCable.server.broadcast("team_", completion: rounded_percent_completion,
        score: render_number(t.score), team_name: t.name)

    end
  end

  def render_number(number)
    ApplicationController.render(
      partial: 'game/number',
      locals: {
        number: number,
      })
  end
end
