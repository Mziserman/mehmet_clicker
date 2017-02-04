class TeamAutoClickerBonus < ApplicationRecord
  include Levelable

  belongs_to :team
  belongs_to :auto_clicker_bonus
end
