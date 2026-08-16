class CheckoutController < ApplicationController
  before_action :authenticate_user!

  def index
    render inertia: "user/Billing"
  end

  def create
    price_id = ENV["WANDER_PLAN_PRICE"]
    return redirect_to checkout_index_path, alert: "Stripe price is not configured" if price_id.blank?

    payment_processor = current_user.payment_processor || current_user.set_payment_processor(:stripe)

    checkout_session = payment_processor.checkout(
      mode: "subscription",
      line_items: price_id,
      success_url: user_root_url(success: true),
      cancel_url: checkout_index_url(canceled: true)
    )

    inertia_location checkout_session.url
  end

  def portal
    payment_processor = current_user.payment_processor
    return redirect_to checkout_index_path, alert: "No billing account found" if payment_processor.blank?

    portal_session = payment_processor.billing_portal(return_url: checkout_index_url)

    inertia_location portal_session.url
  end
end
