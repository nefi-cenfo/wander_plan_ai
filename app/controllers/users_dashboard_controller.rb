class UsersDashboardController < ApplicationController
  include TripsSerializable

  before_action :authenticate_user!

  def index
    render inertia: "user/UserDashboard", props: {
      featured_trip: featured_trip ? build_trip_details_prop(featured_trip) : nil,
      upcoming_trips: build_trips_prop(upcoming_trips),
      travel_stats: travel_stats
    }
  end

  private

  def featured_trip
    current_user.trips.current_trip.first || current_user.trips.next_trips.order(:start_date).first
  end

  def upcoming_trips
    current_user.trips.next_trips.order(:start_date).limit(3)
  end

  def travel_stats
    trips = current_user.trips

    {
      locations_visited: trips.joins(:destinations).distinct.count("destinations.id"),
      upcoming_trips: trips.next_trips.count,
      completed_trips: trips.where("end_date < ?", Date.current).count,
      ai_itineraries: trips.joins(:itinerary).where.not(itineraries: { plan_ai: {} }).count
    }
  end
end
