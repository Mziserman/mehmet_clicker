module Buyer
  extend ActiveSupport::Concern

  def buy_click_bonus!(bonus)
    if self.bonuses.include?(bonus)
      tb = self.team_bonuses.where(bonus: bonus).first
      tb.level += 1
      tb.save
    else
      self.bonuses.add(bonus)
    end
  end

  def buy_auto_clicker_bonus!(auto_clicker_bonus)
    if self.auto_clicker_bonuses.include?(auto_clicker_bonus)
      tacb = self.team_auto_clicker_bonuses
        .where(auto_clicker_bonus: auto_clicker_bonus).first
      tacb.level += 1
      tacb.save
    else
      self.team_auto_clicker_bonuses.add(team_auto_clicker_bonuses)
    end
  end
end
