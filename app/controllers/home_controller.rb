class HomeController < ApplicationController
  def index
    if current_user.blank?
      if cookies[:user_id].blank?
        iu = InvitedUser.create
        cookies.signed[:user_id] = iu.id
      else

      end
    else
      cookies.signed[:user_id] = current_user.id
    end
    @teams = Team.all
  end
end
