class UsersDashboardController < ApplicationController
  def index
    render inertia: "user/UserDashboard"
  end
end
