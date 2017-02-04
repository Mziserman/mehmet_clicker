class CreateBonuses < ActiveRecord::Migration[5.0]
  def change
    create_table :bonuses do |t|
      t.string :name
      t.integer :base_click_bonus, default: 1
      t.float :level_up_click_inc, default: 0.3
      t.integer :base_price, default: 1
      t.float :level_up_price_inc, default: 0.6

      t.timestamps
    end
  end
end
