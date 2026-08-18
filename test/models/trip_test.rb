require "test_helper"

class TripTest < ActiveSupport::TestCase
  test "trip is invalid when dates overlap another trip for the same user" do
    user = create_user("overlap@example.com")
    create_trip(user, Date.new(2026, 9, 10), Date.new(2026, 9, 15))

    trip = build_trip(user, Date.new(2026, 9, 14), Date.new(2026, 9, 18))

    assert_not trip.valid?
    assert_includes trip.errors[:start_date], "overlaps an existing trip"
  end

  test "trip is valid when dates do not overlap another trip for the same user" do
    user = create_user("available@example.com")
    create_trip(user, Date.new(2026, 9, 10), Date.new(2026, 9, 15))

    trip = build_trip(user, Date.new(2026, 9, 16), Date.new(2026, 9, 20))

    assert trip.valid?
  end

  test "trip can overlap another users trip" do
    first_user = create_user("first-user@example.com")
    second_user = create_user("second-user@example.com")
    create_trip(first_user, Date.new(2026, 9, 10), Date.new(2026, 9, 15))

    trip = build_trip(second_user, Date.new(2026, 9, 14), Date.new(2026, 9, 18))

    assert trip.valid?
  end

  test "trip is invalid when end date is before start date" do
    user = create_user("invalid-range@example.com")
    trip = build_trip(user, Date.new(2026, 9, 20), Date.new(2026, 9, 18))

    assert_not trip.valid?
    assert_includes trip.errors[:end_date], "must be on or after start date"
  end

  private

  def create_user(email)
    User.create!(
      email: email,
      password: "password123",
      name: "Test",
      lastname: "Traveler",
      role: :user,
      status: "active",
      subscription: Subscription.create!(
        name: "Basic",
        description: "Basic plan",
        price: 0,
        currency: "USD",
        billing_period: "month"
      )
    )
  end

  def create_trip(user, start_date, end_date)
    build_trip(user, start_date, end_date).tap(&:save!)
  end

  def build_trip(user, start_date, end_date)
    Trip.new(
      user: user,
      itinerary: Itinerary.create!(suggestions_ai: [ "Visit landmarks" ], plan_ai: {}),
      start_date: start_date,
      end_date: end_date,
      number_days: (end_date - start_date).to_i + 1
    )
  end
end
