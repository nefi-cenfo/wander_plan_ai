class Itinerary < ApplicationRecord
  belongs_to :budget_estimate
  has_many :trips
end
