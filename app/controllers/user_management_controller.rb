class UserManagementController < ApplicationController
  before_action :authenticate_user!

  def index
    render inertia: "admin/UserManagement", props: {
      user_management_stats: user_management_stats,
      users_table: users_table
    }
  end

  private

  SORT_COLUMNS = {
    "user" => "LOWER(users.name)",
    "plan" => "premium_sort",
    "trips_saved" => "trips_saved",
    "join_date" => "users.created_at",
    "status" => "normalized_status"
  }.freeze

  PLAN_FILTERS = %w[all basic premium].freeze

  DEFAULT_PER_PAGE = 5
  MAX_PER_PAGE = 25

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
    active_premium_subscriptions.distinct.count("users.id")
  end

  def users_table
    page = table_page
    per_page = table_per_page
    filtered_users = apply_table_filters(User.user)
    total_count = filtered_users.count
    rows = users_table_rows(filtered_users, page, per_page)

    {
      rows: rows,
      pagination: {
        page: page,
        per_page: per_page,
        total_count: total_count
      },
      filters: table_filters
    }
  end

  def users_table_rows(users_scope, page, per_page)
    premium_user_ids = active_premium_subscriptions.select("users.id")
    offset = (page - 1) * per_page

    users_scope
      .left_joins(:trips)
      .select("users.id, users.name, users.lastname, users.email, users.created_at, users.status")
      .select("COUNT(trips.id) AS trips_saved")
      .select("CASE WHEN users.id IN (#{premium_user_ids.to_sql}) THEN 1 ELSE 0 END AS premium_sort")
      .select("LOWER(COALESCE(NULLIF(users.status, ''), 'active')) AS normalized_status")
      .group("users.id")
      .order(Arel.sql(table_order_clause))
      .limit(per_page)
      .offset(offset)
      .map { |user| serialize_table_user(user, user.premium_sort.to_i == 1) }
  end

  def serialize_table_user(user, premium)
    {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      plan: premium ? "Premium" : "Basic",
      trips_saved: user.trips_saved.to_i,
      join_date: user.created_at.to_date.iso8601,
      status: user.status.presence || "Active"
    }
  end

  def apply_table_filters(users_scope)
    users_scope = apply_search_filter(users_scope)
    users_scope = apply_plan_filter(users_scope)

    users_scope
  end

  def apply_search_filter(users_scope)
    search = table_filters[:search]
    return users_scope if search.blank?

    escaped_search = ActiveRecord::Base.sanitize_sql_like(search.downcase)
    search_pattern = "%#{escaped_search}%"

    users_scope.where(
      "LOWER(users.name) LIKE :search OR LOWER(users.lastname) LIKE :search OR LOWER(users.email) LIKE :search OR CAST(users.id AS TEXT) LIKE :search",
      search: search_pattern
    )
  end

  def apply_plan_filter(users_scope)
    premium_user_ids = active_premium_subscriptions.select("users.id")

    case table_filters[:plan]
    when "premium"
      users_scope.where(id: premium_user_ids)
    when "basic"
      users_scope.where.not(id: premium_user_ids)
    else
      users_scope
    end
  end

  def active_premium_subscriptions
    Pay::Subscription
      .joins("INNER JOIN pay_customers ON pay_customers.id = pay_subscriptions.customer_id")
      .joins("INNER JOIN users ON users.id = pay_customers.owner_id")
      .where(pay_customers: { owner_type: "User" }, users: { role: User.roles[:user] }, status: [ "active", "trialing" ])
  end

  def table_filters
    {
      search: params[:search].to_s.strip,
      plan: PLAN_FILTERS.include?(params[:plan]) ? params[:plan] : "all",
      sort: SORT_COLUMNS.key?(params[:sort]) ? params[:sort] : "join_date",
      direction: params[:direction] == "asc" ? "asc" : "desc"
    }
  end

  def table_order_clause
    filters = table_filters
    direction = filters[:direction]
    sort_column = SORT_COLUMNS.fetch(filters[:sort])
    secondary_sort = filters[:sort] == "join_date" ? "users.id #{direction}" : "users.created_at DESC"

    "#{sort_column} #{direction.upcase}, #{secondary_sort}"
  end

  def table_page
    [ params[:page].to_i, 1 ].max
  end

  def table_per_page
    per_page = params[:per_page].to_i
    per_page = DEFAULT_PER_PAGE if per_page < 1

    [ per_page, MAX_PER_PAGE ].min
  end
end
