class BudgetEstimate < ApplicationRecord
  has_one :itinerary, dependent: :destroy
end
