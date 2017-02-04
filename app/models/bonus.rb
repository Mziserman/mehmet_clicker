class Bonus < ApplicationRecord
  has_many :team_bonuses
  has_many :teams, through: :team_bonuses
end
