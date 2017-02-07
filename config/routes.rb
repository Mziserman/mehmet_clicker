Rails.application.routes.draw do
  get 'game/index'

  get 'team/index'
  get 'team/join'
  get 'team/tampon'
  get "home/index"


  devise_for :users

  root to: "home#landing"
end
