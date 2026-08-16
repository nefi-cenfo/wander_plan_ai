class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :itinerary
  has_many :trip_destinations, dependent: :destroy
  has_many :destinations, through: :trip_destinations

  validates :start_date, presence: true
  validates :end_date, presence: true

  scope :next_trips, -> { where("start_date > ?", Date.current) }
  scope :current_trip, -> { where("start_date <= ? AND end_date >= ?", Date.current, Date.current) }
end
