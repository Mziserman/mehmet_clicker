class CreateTeamAutoClickerBonuses < ActiveRecord::Migration[5.0]
  def change
    create_table :team_auto_clicker_bonuses do |t|
      t.integer :team_id
      t.integer :auto_clicker_bonus_id
      t.integer :level, default: 1

      t.timestamps
    end
  end
end
