class TeamBonus < ApplicationRecord
  include Levelable

  belongs_to :team
  belongs_to :bonus
end
