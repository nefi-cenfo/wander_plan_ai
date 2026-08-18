class AiTravelPlannerService
  def initialize(trip, destination, interests = [])
    @trip = trip
    @destination = destination
    @interests = interests.take(3)
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
    base_prompt = <<~PROMPT
      You are an expert AI travel planner and geographical data extraction API.#{' '}
      Your sole purpose is to generate highly accurate, localized, and structured travel itineraries.

      You must output the response exclusively as a valid JSON object. The JSON object must contain a single key called "itinerary", which holds an array of objects.

      CRITICAL INSTRUCTION: The `name` property for each location must be the exact, official, and universally recognized name of the attraction (e.g., "Musée du Louvre"). This exact string will be used to query the TripAdvisor Content API. Do not use generic names.

      Each object in the "itinerary" array must strictly contain the following keys:
      - name (string): The official, exact name of the attraction.
      - description (string): A brief, engaging summary of what the place is and why it is worth visiting (max 3 sentences).
      - tips (string): Actionable advice for the traveler.
      - specialNotes (string): Important logistical or cultural notes.
      - country (string): The official name of the country.
      - city (string): The specific city or town.
    PROMPT

    if @interests.any?
      base_prompt += <<~INTERESTS

        CRITICAL INSTRUCTION: The user has specified the following travel interests: #{@interests.join(', ')}.
        You must heavily bias your attraction selection, restaurant suggestions, and daily pacing to align with these exact preferences.
      INTERESTS
    end

    base_prompt
  end

  def user_prompt
    "Location: #{@destination.location}\nDuration: #{@trip.number_days} days"
  end
end
