class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  inertia_share do
    {
      auth: {
        user: current_user ? {
          id: current_user.id,
          email: current_user.email,
          role: current_user.role,
          name: current_user.name,
          lastname: current_user.lastname
        } : nil
      },
      flash: {
        notice: flash[:notice],
        alert: flash[:alert]
      },
      errors: session.delete(:errors) || {}
    }
  end

  protected

  def after_sign_in_path_for(resource)
    if resource.role == "admin"
      admin_dashboard_path
    else
      user_root_path
    end
  end
end
