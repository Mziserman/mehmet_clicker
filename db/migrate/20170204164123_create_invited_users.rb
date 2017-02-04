class CreateInvitedUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :invited_users do |t|
      t.integer :team_id

      t.timestamps
    end
  end
end
