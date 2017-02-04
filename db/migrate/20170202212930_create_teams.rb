class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.bigint :score, default: 0
      t.string :color

      t.timestamps
    end
  end
end
