Rails.application.routes.draw do
  root to: 'home#index'
  get 'teaser', to: 'home#teaser', as: 'teaser'
  get 'synopsis', to: 'home#synopsis', as: 'synopsis'
  get 'galerie', to: 'home#gallery', as: 'gallery'
  get 'equipe', to: 'home#team', as: 'team'

  devise_for :users

  get 'jeu', to: 'game#index', as: 'game'
  get 'jeu/jouer', to: 'game#game'

  get 'team/index'
  get 'team/join'
  get 'team/tampon'
end
