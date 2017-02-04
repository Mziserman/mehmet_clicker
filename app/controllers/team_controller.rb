class TeamController < ApplicationController
  def join
    if user_signed_in?
      current_user.team = Team.find(params[:id])
      current_user.save
    elsif !cookies.signed[:user_id].blank?
      iu = InvitedUser.find(cookies.signed[:user_id])
      iu.team = Team.find(params[:id])
      iu.save
    end
    redirect_to :controller => "game", :action => "index"
  end
end
