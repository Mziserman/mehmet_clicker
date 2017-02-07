class GameController < ApplicationController
  layout 'game'

  def index
    @user = user_signed_in? ? current_user : InvitedUser.find(cookies.signed[:user_id])
    @team = @user.team
    @teams = Team.all
  end

  def game
  end
end
