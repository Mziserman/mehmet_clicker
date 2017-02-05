class CreateGoals < ActiveRecord::Migration[5.0]
  def change
    create_table :goals do |t|
      t.integer :score
      t.string :name
      t.string :description
      t.integer :team_id

      t.timestamps
    end
  end
end
