# frozen_string_literal: true

Rails.application.routes.draw do
  resources :passwords, controller: "clearance/passwords", only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:index, :new, :create] do
    resource :password, controller: "clearance/passwords", only: [:edit, :update]
  end

  get 'welcome/index'
  get 'unsubscribe', to: 'welcome#unsubscribe'

  resources :twitter_accounts, only: [:create]
  delete 'twitter_accounts', to: 'twitter_accounts#destroy'

  root 'welcome#index'
end
