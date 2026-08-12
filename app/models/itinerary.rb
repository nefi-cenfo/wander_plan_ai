class Itinerary < ApplicationRecord
  belongs_to :budget_estimate, optional: true
  has_many :trips

  validates :suggestions_ai, presence: true
end
