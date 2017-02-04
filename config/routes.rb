Rails.application.routes.draw do
  get 'game/index'

  get 'team/join'
  get 'team/tampon'

  devise_for :users

  root to: "home#index"
end
