Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'index#index'
  resources :index, only: [:index]
  resource :users
  resource :sessions
  resources :rooms
end
