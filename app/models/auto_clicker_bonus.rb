class AutoClickerBonus < ApplicationRecord
  has_many :team_auto_clicker_bonuses
  has_many :teams, through: :team_auto_clicker_bonuses
end
