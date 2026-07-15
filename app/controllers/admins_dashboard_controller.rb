class AdminsDashboardController < ApplicationController
  def index
    render inertia: "admin/AdminDashboard"
  end
end
