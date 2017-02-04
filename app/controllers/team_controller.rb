class TeamController < ApplicationController
  def join
    if user_signed_in?
      current_user.team = Team.find(params[:id])
      current_user.save
      refresh_connection(current_user)

    elsif !cookies.signed[:user_id].blank?
      iu = InvitedUser.find(cookies.signed[:user_id])
      iu.team = Team.find(params[:id])
      iu.save
      refresh_connection(iu)
    else
      iu = InvitedUser.create(team_id: params[:id])
    end

    redirect_to :controller => "game", :action => "index"
  end

  def refresh_connection(user)
    ActionCable.server.remote_connections.where(current_user: user).disconnect
    ActionCable.server.add_connection(current_user: user)
  end
end
