class AutoClickerBonusWorker
  include Sidekiq::Worker

  def perform(*args)
    Team.find_each do |t|
      score_bonus = 0
      t.team_auto_clicker_bonuses.each do |tacb|
        score_bonus += tacb.click_bonus
      end
      t.update!(score: t.score + score_bonus)

      template = 'team_%s'
      channel = template % [t.id]

      ActionCable.server.broadcast(channel, score: render_number(t.score),
        bonus: score_bonus)
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
