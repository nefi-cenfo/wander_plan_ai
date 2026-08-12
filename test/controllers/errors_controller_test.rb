require "test_helper"

class ErrorsControllerTest < ActionDispatch::IntegrationTest
  test "renders the Inertia not found page for an unknown route" do
    get "/route-that-does-not-exist"

    assert_response :not_found
    assert_inertia_response
    assert_inertia_component "errors/NotFound"
  end
end
