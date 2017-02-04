class TeamController < ApplicationController
  def join
    if user_signed_in?
      current_user.team = Team.find(params[:id])
      current_user.save
      ActionCable.server.remote_connections.where(current_user: User
        .find(cookies.signed[:user_id])).disconnect
    elsif !cookies.signed[:user_id].blank?
      iu = InvitedUser.find(cookies.signed[:user_id])
      iu.team = Team.find(params[:id])
      iu.save
      ActionCable.server.remote_connections.where(current_user: InvitedUser
        .find(cookies.signed[:user_id])).disconnect
    else
      iu = InvitedUser.create(team_id: params[:id])
    end

    redirect_to :controller => "game", :action => "index"
  end
end
