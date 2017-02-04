module Levelable
  extend ActiveSupport::Concern

  def click_bonus
    if self.instance_of?(TeamBonus)
      click_bonus = self.bonus.base_click_bonus
      (0..level).each do
        click_bonus += click_bonus * self.bonus.level_up_click_inc
      end
      return click_bonus
    else
      click_bonus = self.auto_clicker_bonus.base_click_bonus
      (0..level).each do
        click_bonus += click_bonus * self.auto_clicker_bonus.level_up_click_inc
      end
      return click_bonus
    end
  end

  def price
    if self.instance_of?(TeamBonus)
      price = self.bonus.base_price
      (0..level).each do
        price += price * self.bonus.level_up_price_inc
      end
      return price
    else
      price = self.auto_clicker_bonus.base_price
      (0..level).each do
        price += price * self.auto_clicker_bonus.level_up_price_inc
      end
      return price
    end
  end

  def level_up!
    t = self.team
    if t.score >= self.price
      t.update!(score: t.score - self.price)
      self.update!(level: self.level + 1)
    end
    return t.score
  end
end
