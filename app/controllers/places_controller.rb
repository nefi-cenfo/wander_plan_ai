class PlacesController < ApplicationController
  before_action :authenticate_user!

  def show
    destination_id = params[:destination_id]
    place_name = params[:name]

    @destination = Destination.find_by_id(destination_id)
    suggestion = find_suggestion(place_name)

    return render inertia: "errors/NotFound" unless @destination
    return render inertia: "errors/NotFound", status: :not_found unless suggestion

    saved_place = @destination.saved_places.find_by_name(place_name)

    if !saved_place
      trip_advisor_data = TripadvisorEnrichmentService.new(place_name, suggestion["city"]).call

      tripadvisor_id = trip_advisor_data&.dig(:location_details, "id")

      unless tripadvisor_id
        return render inertia: "errors/TripadvisorUnavailable",
                      props: { place_name: place_name },
                      status: :not_found
      end

      saved_place = SavedPlace.new(tripadvisor_id: tripadvisor_id, name: place_name, enriched_data: trip_advisor_data)
      @destination.saved_places << saved_place
      @destination.save
    end

    render inertia: "user/PlaceDetails", props: {
      suggestion: suggestion,
      enrichedData: saved_place.enriched_data
    }
  end

  def enriched_data
    place_name = params[:place]
    destination_id = params[:destination_id]
    city = params[:city]

    @destination = Destination.find_by_id(destination_id)

    return render json: { error: "Destination not found" }, status: :not_found unless @destination

    @destination = Destination.find_by_id(destination_id)

    saved_place = @destination.saved_places.find_by_name(place_name)

    unless saved_place
      trip_advisor_data = TripadvisorEnrichmentService.new(place_name, city).call
      tripadvisor_id = trip_advisor_data.dig(:location_details, "id")

      saved_place = SavedPlace.new(tripadvisor_id: tripadvisor_id, name: place_name, enriched_data: trip_advisor_data)
      @destination.saved_places << saved_place
      @destination.save
    end

    render json: saved_place.enriched_data
  end

  private

  def find_suggestion(name)
    @itinerary = Itinerary.where("suggestions_ai @> ?", [ { name: name } ].to_json).first
    return nil unless @itinerary

    @itinerary.suggestions_ai.find { |item| item["name"] == name }
  end
end
