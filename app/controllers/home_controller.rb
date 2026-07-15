class HomeController < ApplicationController
  # before_action :authenticate_user!, except: [:new, ...]
  def index
    render inertia: "home/Home"
  end
end
