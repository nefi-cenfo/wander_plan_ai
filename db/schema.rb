# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_25_190123) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "budget_estimates", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.float "entertainment", null: false
    t.float "food", null: false
    t.float "stay", null: false
    t.float "total", null: false
    t.float "transport", null: false
    t.datetime "updated_at", null: false
  end

  create_table "destinations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.float "latitude", null: false
    t.string "location", null: false
    t.float "longitude", null: false
    t.datetime "updated_at", null: false
  end

  create_table "itineraries", force: :cascade do |t|
    t.bigint "budget_estimate_id"
    t.datetime "created_at", null: false
    t.jsonb "plan_ai", null: false
    t.jsonb "suggestions_ai", null: false
    t.datetime "updated_at", null: false
    t.index ["budget_estimate_id"], name: "index_itineraries_on_budget_estimate_id"
  end

  create_table "saved_places", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "destination_id", null: false
    t.jsonb "enriched_data", null: false
    t.string "name", null: false
    t.integer "tripadvisor_id", null: false
    t.datetime "updated_at", null: false
    t.index ["destination_id"], name: "index_saved_places_on_destination_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.string "billing_period", null: false
    t.datetime "created_at", null: false
    t.string "currency", default: "USD", null: false
    t.string "description", null: false
    t.string "name", null: false
    t.float "price", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trip_destinations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "destination_id", null: false
    t.bigint "trip_id", null: false
    t.datetime "updated_at", null: false
    t.index ["destination_id"], name: "index_trip_destinations_on_destination_id"
    t.index ["trip_id"], name: "index_trip_destinations_on_trip_id"
  end

  create_table "trips", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.date "end_date", null: false
    t.bigint "itinerary_id"
    t.integer "number_days", null: false
    t.date "start_date", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["itinerary_id"], name: "index_trips_on_itinerary_id"
    t.index ["user_id"], name: "index_trips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "account_id", default: "", null: false
    t.string "address"
    t.string "city"
    t.string "country"
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "lastname", null: false
    t.string "name", null: false
    t.string "postal_code"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.integer "role", null: false
    t.string "state"
    t.string "status", default: "", null: false
    t.bigint "subscription_id", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["subscription_id"], name: "index_users_on_subscription_id"
  end

  add_foreign_key "itineraries", "budget_estimates"
  add_foreign_key "saved_places", "destinations"
  add_foreign_key "trip_destinations", "destinations"
  add_foreign_key "trip_destinations", "trips"
  add_foreign_key "trips", "itineraries"
  add_foreign_key "trips", "users"
end
