Rails.application.routes.draw do
  root to: 'home#index'
  get 'trailer', to: 'home#trailer'
  get 'synopsis', to: 'home#synopsis'
  get 'gallerie', to: 'home#gallery'
  get 'equipe', to: 'home#team'

  devise_for :users

  get 'jeu', to: 'game#index'
  get 'jeu/jouer', to: 'game#game'

  get 'team/index'
  get 'team/join'
  get 'team/tampon'
end
