class ItinerariesController < ApplicationController
  include TripsSerializable

  before_action :authenticate_user!
  before_action :require_premium!

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

  def download_pdf
    trip_id = params[:trip_id]
    @trip = current_user.trips.find_by_id(trip_id)
    return render inertia: "errors/NotFound" unless @trip

    @itinerary = @trip.itinerary
    @destination = @trip.destinations.first
    @daily_schedule = @itinerary.plan_ai

    html = render_to_string(
      template: "itineraries/pocket_mode_pdf",
      layout: false,
      locals: { trip: @trip, destination: @destination, daily_schedule: @daily_schedule }
    ).encode("UTF-8")
    pdf = Grover.new(html).to_pdf

    send_data pdf,
              filename: "WanderPlan_#{@destination.location}_PocketMode.pdf",
              type: "application/pdf",
              disposition: "attachment"
  end

  private

  def require_premium!
    redirect_to checkout_index_path, alert: "You need a Premium subscription to access this feature." unless current_user.premium?
  end
end
