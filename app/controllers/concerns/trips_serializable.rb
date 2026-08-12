module TripsSerializable
  extend ActiveSupport::Concern

  private

  def build_trips_prop(trips)
    trips.map do |trip|
      {
        id: trip.id,
        startDate: trip.start_date,
        endDate: trip.end_date,
        numberDays: trip.number_days,
        itinerary: {
          id: trip.itinerary.id,
          suggestions: trip.itinerary.suggestions_ai,
          plannedDays: trip.itinerary.plan_ai
        },
        destination: {
          id: trip.destinations.first.id,
          location: trip.destinations.first.location,
          latitude: trip.destinations.first.latitude,
          longitude: trip.destinations.first.longitude
        }
      }
    end
  end

  def build_trip_details_prop(trip)
    {
      id: trip.id,
      startDate: trip.start_date,
      endDate: trip.end_date,
      numberDays: trip.number_days,
      itinerary: {
        id: trip.itinerary.id,
        suggestions: trip.itinerary.suggestions_ai,
        plannedDays: trip.itinerary.plan_ai
      },
      destination: {
        id: trip.destinations.first.id,
        location: trip.destinations.first.location,
        latitude: trip.destinations.first.latitude,
        longitude: trip.destinations.first.longitude
      }
    }
  end
end
