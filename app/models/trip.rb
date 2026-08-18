class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :itinerary
  has_many :trip_destinations, dependent: :destroy
  has_many :destinations, through: :trip_destinations

  validates :start_date, presence: true
  validates :end_date, presence: true
  validate :end_date_on_or_after_start_date
  validate :dates_do_not_overlap_existing_trips

  scope :next_trips, -> { where("start_date > ?", Date.current) }
  scope :current_trip, -> { where("start_date <= ? AND end_date >= ?", Date.current, Date.current) }

  def date_errors
    errors.clear
    end_date_on_or_after_start_date
    dates_do_not_overlap_existing_trips
    errors
  end

  private

  def end_date_on_or_after_start_date
    return if start_date.blank? || end_date.blank?
    return if end_date >= start_date

    errors.add(:end_date, "must be on or after start date")
  end

  def dates_do_not_overlap_existing_trips
    return if user.blank? || start_date.blank? || end_date.blank?
    return if end_date < start_date

    overlapping_trips = user.trips
      .where.not(id: id)
      .where("start_date <= ? AND end_date >= ?", end_date, start_date)

    return unless overlapping_trips.exists?

    errors.add(:start_date, "overlaps an existing trip")
  end
end
