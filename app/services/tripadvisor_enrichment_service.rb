require "httparty"

class TripadvisorEnrichmentService
  include HTTParty

  # base_uri "https://terra.tripadvisor.com/api" # Include on env
  base_uri ENV["TRIPADVISOR_API_URI"]

  def initialize(attraction_name, location_context)
    @attraction_name = attraction_name
    @location_context = location_context
    @api_key = ENV["TRIPADVISOR_API_KEY"]
  end

  def call
    location_details = search_location
    return nil unless location_details

    location_photos = search_photos(location_details["id"])
    location_reviews = search_reviews(location_details["id"])

    {
      location_details: location_details,
      location_photos: location_photos,
      location_reviews: location_reviews
    }
  rescue StandardError => e
    Rails.logger.error("Error on TripAdvisor API: #{e.message}")
  end

  private

  def search_location
    response = self.class.get(
      "/locations/search",
      query: {
        query: @attraction_name,
        search_type: "NAME"
      },
      headers: {
        "X-API-Key" => @api_key,
        "accept" => "application/json"
      }
    )

    return nil unless response.success? && response.parsed_response["data"].present?

    data = response.parsed_response["data"]
    # normalized_context = ActiveSupport::Inflector.transliterate(@location_context.to_s).downcase
    # matched_result = data.find do |item|
    #   geo = item.dig("location", "geo")
    #   normalized_geo = ActiveSupport::Inflector.transliterate(geo.to_s).downcase

    #   normalized_geo.include?(normalized_context)
    # end
    # matched_result&.dig("location")

    score_results(data)
  end

  def search_photos(location_id)
    response = self.class.get(
      "/locations/#{location_id}/photos",
      headers: {
        "X-API-Key" => @api_key,
        "accept" => "application/json"
      }
    )

    return nil unless response.success?

    response.parsed_response["data"]
  end

  def search_reviews(location_id)
    response = self.class.get(
      "/locations/#{location_id}/reviews",
      headers: {
        "X-API-Key" => @api_key,
        "accept" => "application/json"
      }
    )

    return nil unless response.success?

    response.parsed_response["data"]
  end

  def normalize_text(value)
    ActiveSupport::Inflector.transliterate(value.to_s).downcase.strip
  end

  def score_results(data)
    results = data.map do |item|
      location = item["location"]

      geo = normalize_text(location["geo"])
      city = normalize_text(location.dig("addresses", 0, "city"))
      country = normalize_text(location.dig("addresses", 0, "country_name"))
      formatted = normalize_text(location.dig("addresses", 0, "formatted"))
      context = normalize_text(@location_context)

      score = 0
      score += 5 if geo == context
      score += 4 if formatted.include?(context)
      score += 3 if city == context
      score += 2 if geo.include?(context) || context.include?(geo)
      score += 1 if country.present? && context.include?(country)

      [ score, item ]
    end

    best_match = results.max_by { |score, _item| score }

    return nil if best_match.first.zero?

    best_match.last.dig("location")
  end
end
