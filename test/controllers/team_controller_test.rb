require 'test_helper'

class TeamControllerTest < ActionDispatch::IntegrationTest
  test "should get join" do
    get team_join_url
    assert_response :success
  end

end
