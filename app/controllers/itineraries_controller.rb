class ItinerariesController < ApplicationController
  before_action :authenticate_user!

  def show
    trip_id = params[:trip_id]
    @trip = current_user.trips.find_by_id(trip_id)

    return render inertia: "errors/NotFound" unless @trip

    @itinerary = @trip.itinerary
    plan_ai = @itinerary.plan_ai

    if plan_ai.blank?
      @destination = @trip.destinations.first
      places = @itinerary.suggestions_ai.map { |suggestion| suggestion["name"] }
      plan_ai = AiItineraryGeneratorService.new(@trip, @destination, places).call
      @itinerary.update(plan_ai: plan_ai)
    end

    render inertia: "user/ItineraryDetails", props: {
      trip: build_trip_details_prop(@trip)
    }
  end

  private

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
