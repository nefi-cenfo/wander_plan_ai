class CreateSavedPlaces < ActiveRecord::Migration[8.1]
  def change
    create_table :saved_places do |t|
      t.references :destination, null: false, foreign_key: true
      t.integer :tripadvisor_id, null: false
      t.string :name, null: false
      t.jsonb :enriched_data, null: false

      t.timestamps
    end
  end
end
