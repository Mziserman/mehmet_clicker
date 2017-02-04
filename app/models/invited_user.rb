class InvitedUser < ApplicationRecord
  belongs_to :team, optional: true
end
