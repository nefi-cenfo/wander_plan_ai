class TripsController < ApplicationController
  include TripsSerializable

  before_action :authenticate_user!

  def index
    render inertia: "user/Trips", props: {
      trips: build_trips_prop(next_trips)
    }
  end

  def show
    trip_id = params[:id]
    @trip = current_user.trips.find_by_id(trip_id)

    return render inertia: "errors/NotFound" unless @trip

    render inertia: "user/TripDetails", props: {
      trip: build_trip_details_prop(@trip)
    }
  end

  def new
    created_trip_id = flash[:last_trip_id]
    if created_trip_id
      @trip = Trip.find_by_id(created_trip_id)
      suggestion_list = @trip.itinerary.suggestions_ai
      @destination = @trip.destinations.first
    end
    render inertia: "user/Discover", props: {
      suggestion_list: suggestion_list,
      destination: @destination
    }
  end

  def create
    permitted_params = trip_params

    @trip = Trip.new(permitted_params.except(:location, :latitude, :longitude))
    @trip.user = current_user

    location = permitted_params[:location]
    latitude = permitted_params[:latitude]
    longitude = permitted_params[:longitude]
    start_date = permitted_params[:start_date].to_date
    end_date = permitted_params[:end_date].to_date
    @trip.number_days = (end_date - start_date).to_i + 1

    @destination = Destination.find_or_initialize_by(latitude: latitude, longitude: longitude)
    @destination.location = location
    suggestion_list = AiTravelPlannerService.new(@trip, @destination).call
    @itinerary = Itinerary.new(suggestions_ai: suggestion_list, plan_ai: {})
    @trip.itinerary = @itinerary

    if @itinerary.save && @trip.save && @destination.save
      @trip.destinations << @destination
      flash[:last_trip_id] = @trip.id
      redirect_to new_trip_path(created_trip_id: @trip.id), notice: "Trip successfully created"
    else
      redirect_to new_trip_path, alert: "There was an error during trip creation"
    end
  end

  def destroy
    trip_id = params[:id]
    trip = current_user.trips.find_by_id(trip_id)

    return render inertia: "errors/NotFound" unless trip

    if trip.destroy
      redirect_to trips_path, notice: "Trip successfully deleted"
    else
      redirect_to trips_path, alert: "There was an error deleting the trip"
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:start_date, :end_date, :location, :latitude, :longitude)
  end

  def next_trips
    current_user.trips.next_trips
  end
end
