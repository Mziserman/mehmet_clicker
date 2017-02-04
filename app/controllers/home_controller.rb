class HomeController < ApplicationController
  def index
    if current_user.blank?
      if cookies.signed[:user_id].blank?
        iu = InvitedUser.create
        cookies.signed[:user_id] = iu.id
      else
        iu = InvitedUser.find(cookies.signed[:user_id])
        redirect_to(:controller => "game", :action => "index") unless iu.team.blank?
      end
    else
      cookies.signed[:user_id] = current_user.id
      redirect_to(:controller => "game", :action => "index") unless current_user.team.blank?
    end
    @teams = Team.all
  end
end
