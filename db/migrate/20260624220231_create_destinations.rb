class CreateDestinations < ActiveRecord::Migration[8.1]
  def change
    create_table :destinations do |t|
      t.string :location, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false

      t.timestamps
    end
  end
end
