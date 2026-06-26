class CreateTrips < ActiveRecord::Migration[8.1]
  def change
    create_table :trips do |t|
      t.references :user, null: false, foreign_key: true
      t.references :itinerary, null: true, foreign_key: true
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :number_days, null: false

      t.timestamps
    end
  end
end
