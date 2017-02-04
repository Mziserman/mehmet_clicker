class GameController < ApplicationController
  def index
    @user = user_signed_in? ? current_user : InvitedUser.find(cookies.signed[:user_id])
    @team = @user.team
  end
end
