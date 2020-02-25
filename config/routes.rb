# frozen_string_literal: true

Rails.application.routes.draw do
  get 'welcome/index'
  get 'unsubscribe', to: 'welcome#unsubscribe'

  resources :twitter_accounts, only: [:create]
  delete 'twitter_accounts', to: 'twitter_accounts#destroy'

  root 'welcome#index'
end
