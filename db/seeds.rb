# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

subscription = Subscription.where(name: "Free").first_or_initialize
subscription.update!(
  description: "Free account",
  price: 0.0,
  billing_period: "lifetime"
)

user = User.where(email: "nefiu12@gmail.com").first_or_initialize
user.update!(
  subscription: subscription,
  password: "123queso",
  password_confirmation: "123queso",
  name: "Nefi",
  lastname: "Urena",
  status: "active",
  account_id: 0,
  role: 1
)
