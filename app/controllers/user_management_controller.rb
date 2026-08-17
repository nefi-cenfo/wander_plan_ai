class UserManagementController < ApplicationController
  before_action :authenticate_user!

  def index
    render inertia: "admin/UserManagement", props: {
      user_management_stats: user_management_stats
    }
  end

  private

  def user_management_stats
    total_users = User.user.count
    premium_users = active_premium_users_count

    {
      total_users: total_users,
      premium_users: premium_users,
      basic_users: total_users - premium_users,
      new_users_this_month: User.user.where(created_at: Time.current.all_month).count
    }
  end

  def active_premium_users_count
    Pay::Subscription
      .joins("INNER JOIN pay_customers ON pay_customers.id = pay_subscriptions.customer_id")
      .joins("INNER JOIN users ON users.id = pay_customers.owner_id")
      .where(pay_customers: { owner_type: "User" }, users: { role: User.roles[:user] }, status: [ "active", "trialing" ])
      .distinct
      .count("users.id")
  end
end
