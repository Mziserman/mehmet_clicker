class Team < ApplicationRecord
  include Buyer

  has_many :users
  has_many :invited_users
  has_many :team_bonuses
  has_many :bonuses, through: :team_bonuses

  has_many :team_auto_clicker_bonuses
  has_many :auto_clicker_bonuses, through: :team_auto_clicker_bonuses

  def click_bonus
    click_bonus = 0
    team_bonuses.each do |tb|
      click_bonus += tb.click_bonus
    end
    return click_bonus
  end

  def auto_clicker_increment
    click_bonus = 0
    self.team_auto_clicker_bonuses.each do |tacb|
      click_bonus += tacb.click_bonus
    end
    return click_bonus
  end
end
