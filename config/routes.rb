Rails.application.routes.draw do
  get 'game/index'

  get 'team/join'

  devise_for :users

  root to: "home#index"
end
