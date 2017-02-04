class TeamController < ApplicationController
  def join
    if user_signed_in?
      current_user.team = Team.find(params[:id])
      current_user.save
    elsif !cookies.signed[:user_id].blank?
      iu = InvitedUser.find(cookies.signed[:user_id])
      iu.team = Team.find(params[:id])
      iu.save
    else
      iu = InvitedUser.create(team_id: params[:id])
    end
    # redirect_to :controller => "game", :action => "index"

    redirect_to action: "tampon"
  end
  def tampon
    redirect_to :controller => "game", :action => "index"
  end
end
