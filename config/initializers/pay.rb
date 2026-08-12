Pay.setup do |config|
  config.application_name = "WanderPlan"
  config.business_name = "WanderPlan"
  config.enabled_processors = [ :stripe ]
end

if ENV["STRIPE_PRIVATE_KEY"].present?
  Pay::Stripe.setup
  Pay::Stripe.configure_webhooks
end
