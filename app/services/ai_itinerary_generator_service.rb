class AiItineraryGeneratorService
  def initialize(trip, destination, preferred_places = [])
    @trip = trip
    @destination = destination
    @preferred_places = preferred_places
    @client = OpenAI::Client.new(api_key: ENV["OPENAI_API_KEY"])
  end

  def call
    response = @client.chat.completions.create(
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: user_prompt }
      ],
      temperature: 0.7
    )

    raw_json = response.choices.first.message.content

    parsed_data = JSON.parse(raw_json)
    parsed_data["itinerary"]

  rescue StandardError => e
    Rails.logger.error("OpenAI Error for Trip #{@trip.id}: #{e.message}")
    nil
  end

  private

  def system_prompt
    <<~PROMPT
      You are an expert AI travel planner and itinerary generation API.#{' '}
      Your purpose is to build structured, logical, and realistic multi-day travel itineraries.

      You must output the response exclusively as a valid JSON object containing a single key called "itinerary", which holds an array of daily itinerary objects. Do not include introductory text, conversational filler, or Markdown formatting blocks.

      CRITICAL RULES FOR PLACES:
      - You must incorporate the user's requested attractions into the itinerary logically based on geography and optimal time of day.
      - To fill remaining morning, afternoon, and evening slots across all days, you must suggest additional high-quality, realistic attractions.
      - The `place` property must always use the exact, official, and universally recognized name of the location (e.g., "Catarata Río Fortuna") so it can be searched and matched reliably on TripAdvisor. Never use generic labels like "Local Restaurant" or "City Center".

      CRITICAL RULES FOR BUDGETS:
      - All `budgetEstimate` values must be represented as numbers in USD (integer or float).
      - Estimate realistic entrance fees, activity costs, or typical consumption for that specific place.
      - If an activity is completely free, set `budgetEstimate` to 0.

      JSON SCHEMA REQUIREMENT:
      Each object in the "itinerary" array must strictly contain the following keys:
      - dayNumber (string): The day label, formatted exactly as "Day 1", "Day 2", etc.
      - morning (object):
        - budgetEstimate (number): Cost estimate in USD.
        - place (string): Official, TripAdvisor-searchable place name.
        - activity (object):
          - description (string): Specific things to do during this moment (max 3 sentences).
          - specialNote (string or null): Important logistical, dress-code, or booking tips. Return null if nothing notable applies.
      - afternoon (object): Exactly the same structure as morning.
      - evening (object): Exactly the same structure as morning.
    PROMPT
  end

  def user_prompt
    places_context = @preferred_places.any? ? @preferred_places.join(", ") : "None specified"
    <<~USER_INPUT
      Destination: #{@destination.location}
      Duration: #{@trip.number_days} days
      User Preferred Places: #{places_context}
    USER_INPUT
  end
end
