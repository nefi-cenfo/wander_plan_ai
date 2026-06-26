class CreateBudgetEstimates < ActiveRecord::Migration[8.1]
  def change
    create_table :budget_estimates do |t|
      t.float :food, null: false
      t.float :stay, null: false
      t.float :transport, null: false
      t.float :entertainment, null: false
      t.float :total, null: false

      t.timestamps
    end
  end
end
