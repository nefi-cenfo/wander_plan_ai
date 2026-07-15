class CreateSubscriptions < ActiveRecord::Migration[8.1]
  def change
    create_table :subscriptions do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.float :price, null: false
      t.string :currency, null: false, default: "USD"
      t.string :billing_period, null: false

      t.timestamps
    end
  end
end
