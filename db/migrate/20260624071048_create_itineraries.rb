class CreateItineraries < ActiveRecord::Migration[8.1]
  def change
    create_table :itineraries do |t|
      t.references :budget_estimate, null: true, foreign_key: true
      t.jsonb :suggestions_ai, null: false
      t.jsonb :plan_ai, null: false

      t.timestamps
    end
  end
end
