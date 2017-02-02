class TeamController < ApplicationController
  def join
    current_user.team = Team.find(params[:id])
    current_user.save
    redirect_to :controller => "game", :action => "index"
  end
end
