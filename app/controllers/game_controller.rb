class GameController < ApplicationController
  layout 'game'

  def index
    if current_user.blank?
      if cookies.signed[:user_id].blank?
        iu = InvitedUser.create
        cookies.signed[:user_id] = iu.id
      else
        iu = InvitedUser.find(cookies.signed[:user_id])
      end
    else
      cookies.signed[:user_id] = current_user.id
    end
    @teams = Team.all
    @goals = Goal.all
  end

  def game
    @user = user_signed_in? ? current_user : InvitedUser.find(cookies.signed[:user_id])
    @team = @user.team
    @teams = Team.all
  end
end
