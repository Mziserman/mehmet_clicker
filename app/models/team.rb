class Team < ApplicationRecord
  include Buyer

  has_many :users
  has_many :team_bonuses
  has_many :bonuses, through: :team_bonuses

  def click_bonus
    click_bonus = 0
    team_bonuses.each do |tb|
      click_bonus += tb.click_bonus
    end
    return click_bonus
  end
end
