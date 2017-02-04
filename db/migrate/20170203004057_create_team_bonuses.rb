class CreateTeamBonuses < ActiveRecord::Migration[5.0]
  def change
    create_table :team_bonuses do |t|
      t.integer :team_id
      t.integer :bonus_id
      t.integer :level, default: 1

      t.timestamps
    end
  end
end
