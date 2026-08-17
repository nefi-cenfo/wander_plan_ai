class AdminsDashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    render inertia: "admin/AdminDashboard", props: {
      admin_stats: admin_stats,
      user_growth_chart: user_growth_chart
    }
  end

  private

  def admin_stats
    {
      total_users: build_stat(User.user, :count),
      active_premium: build_stat(active_premium_subscriptions, :count),
      trips_stored: build_stat(Trip.all, :count),
      locations_saved: build_stat(Destination.all, :count)
    }
  end

  def active_premium_subscriptions
    Pay::Subscription
      .joins("INNER JOIN pay_customers ON pay_customers.id = pay_subscriptions.customer_id")
      .joins("INNER JOIN users ON users.id = pay_customers.owner_id")
      .where(pay_customers: { owner_type: "User" }, users: { role: User.roles[:user] }, status: [ "active", "trialing" ])
  end

  def user_growth_chart
    months = 5.downto(0).map { |month_offset| month_offset.months.ago.beginning_of_month }
    start_at = months.first
    end_at = Time.current.end_of_month
    user_monthly_counts = monthly_counts(User.user, "users.created_at", start_at..end_at)
    premium_monthly_counts = monthly_counts(active_premium_subscriptions, "pay_subscriptions.created_at", start_at..end_at)

    {
      labels: months.map { |month| month.strftime("%b") },
      total_users: cumulative_counts(months, User.user.where("created_at < ?", start_at).count, user_monthly_counts),
      premium_users: cumulative_counts(
        months,
        active_premium_subscriptions.where("pay_subscriptions.created_at < ?", start_at).count,
        premium_monthly_counts
      )
    }
  end

  def monthly_counts(scope, timestamp_column, range)
    scope
      .where(timestamp_column => range)
      .group("DATE_TRUNC('month', #{timestamp_column})")
      .count
      .transform_keys { |date| date.to_date.beginning_of_month }
  end

  def cumulative_counts(months, baseline, monthly_counts)
    running_total = baseline

    months.map do |month|
      running_total += monthly_counts.fetch(month.to_date.beginning_of_month, 0)
      running_total
    end
  end

  def build_stat(scope, count_method)
    current_month = Time.current.beginning_of_month..Time.current.end_of_month
    previous_month = 1.month.ago.beginning_of_month..1.month.ago.end_of_month
    current_period_count = scope.where(created_at: current_month).public_send(count_method)
    previous_period_count = scope.where(created_at: previous_month).public_send(count_method)

    {
      value: scope.public_send(count_method),
      current_period_count: current_period_count,
      previous_period_count: previous_period_count,
      change_percent: change_percent(current_period_count, previous_period_count)
    }
  end

  def change_percent(current_period_count, previous_period_count)
    return 0 if previous_period_count.zero? && current_period_count.zero?
    return 100 if previous_period_count.zero?

    (((current_period_count - previous_period_count).to_f / previous_period_count) * 100).round(1)
  end
end
