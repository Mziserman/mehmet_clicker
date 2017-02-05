class CreateInvitedUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :invited_users do |t|
      t.integer :team_id
      t.string :name

      t.integer :click_count
      t.integer :expenses_count
      t.integer :points_earned

      t.timestamps
    end
  end
end
