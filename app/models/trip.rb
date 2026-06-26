class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :itinerary
  has_many :trip_destinations
  has_many :destinations, through: :trip_destinations
end
