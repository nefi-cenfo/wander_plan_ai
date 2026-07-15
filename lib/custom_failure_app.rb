class CustomFailureApp < Devise::FailureApp
  def respond
    if request.headers["X-Inertia"]
      redirect
    else
      super
    end
  end
end
