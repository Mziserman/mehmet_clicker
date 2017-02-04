class TeamController < ApplicationController
  def join
    if user_signed_in?
      current_user.team = Team.find(params[:id])
      current_user.save
    elsif
      redirect_to :controller => "game", :action => "index"
    end
  end
end
