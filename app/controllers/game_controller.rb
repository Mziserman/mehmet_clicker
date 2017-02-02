class GameController < ApplicationController
  def index
    if user_signed_in?
      cookies.signed[:user_id] = current_user.id
    end
  end
end
