require 'open-uri'

class HomeController < ApplicationController
  def index
  end

  def teaser
  end

  def synopsis
  end

  def game
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
    @goals = Goal.all
  end

  def gallery
    @medias = get_instagram_medias
  end

  def team
  end

  def pick_properties(response)
    result = []

    response.each{|media|
      media_url = media['type'] == 'image' ? media['images'] : media['videos']

      if media_url['standard_resolution']['height'] == 640
        result.push({
          url: media_url['standard_resolution']['url'],
          link: media['link'],
          type: media['type']
        })
      end
    }

    result.compact
  end

  def get_instagram_medias(url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=4570939952.1677ed0.dfb287a8741d4b768774988e07ce1986')
    response = JSON.parse(open(url).read)
    medias = pick_properties(response['data'])
    next_url = response['pagination']['next_url']
    return (next_url.nil? ? medias : medias.concat(get_instagram_medias(next_url)))
  end
end
